<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { Snippet } from 'svelte';

  // Types
  interface ItemPosition {
    x: number;
    y: number;
    width: number;
  }

  interface ResponsiveColumns {
    sm?: number; // < 768px
    md?: number; // >= 768px && < 1024px  
    lg?: number; // >= 1024px
  }

  interface Props {
    columns?: number | ResponsiveColumns;
    gap?: number;
    class?: string;
    children: Snippet;
    [key: string]: any;
  }

  // Props
  let {
    columns = 3,
    gap = 16,
    class: className = '',
    children,
    ...restProps
  }: Props = $props();

  // State
  let container: HTMLDivElement;
  let columnHeights: number[] = $state([]);
  let itemPositions: ItemPosition[] = $state([]);
  let containerHeight: number = $state(0);
  let currentColumns: number = $state(3);
  let isCalculating: boolean = $state(false);

  // Calculate current columns based on screen size
  function calculateCurrentColumns(): number {
    if (typeof window === 'undefined') return 3; // SSR fallback
    
    if (typeof columns === 'number') {
      return columns;
    }
    
    const width = window.innerWidth;
    
    if (width < 768) {
      return columns.sm ?? 1;
    } else if (width < 1024) {
      return columns.md ?? 2;
    } else {
      return columns.lg ?? 3;
    }
  }

  // Update current columns when window size changes
  $effect(() => {
    if (typeof window !== 'undefined') {
      const newColumns = calculateCurrentColumns();
      if (newColumns !== currentColumns) {
        currentColumns = newColumns;
      }
    }
  });

  // Initialize column heights
  $effect(() => {
    columnHeights = new Array(currentColumns).fill(0);
  });

  // Debounced layout calculation
  let layoutTimeout: ReturnType<typeof setTimeout> | null = null;
  
  function debounceLayout(): void {
    if (layoutTimeout) {
      clearTimeout(layoutTimeout);
    }
    layoutTimeout = setTimeout(() => {
      calculateLayout();
    }, 10);
  }

  // Calculate masonry layout
  async function calculateLayout(): Promise<void> {
    if (!container || isCalculating) return;
    
    isCalculating = true;
    
    try {
      await tick();
      
      // Wait a bit more for any pending renders
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const containerWidth: number = container.offsetWidth;
      if (containerWidth === 0) {
        isCalculating = false;
        return; // Container not ready yet
      }
      
      const columnWidth: number = (containerWidth - (gap * (currentColumns - 1))) / currentColumns;
      
      // Reset column heights
      const heights: number[] = new Array(currentColumns).fill(0);
      const positions: ItemPosition[] = [];

      // Get all direct child elements
      const itemElements: NodeListOf<HTMLElement> = container.querySelectorAll(':scope > *');

      itemElements.forEach((element: HTMLElement, index: number) => {
        // Ensure element is visible and has dimensions
        if (element.offsetHeight === 0) {
          // Force a reflow by accessing offsetHeight
          element.style.height = 'auto';
          element.offsetHeight; // Force reflow
        }
        
        // Find the shortest column
        const shortestColumnIndex: number = heights.indexOf(Math.min(...heights));
        
        // Calculate position
        const x: number = shortestColumnIndex * (columnWidth + gap);
        const y: number = heights[shortestColumnIndex];
        
        // Store position
        positions[index] = {
          x,
          y,
          width: columnWidth
        };
        
        // Apply styles directly to the element
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${columnWidth}px`;
        element.style.transition = 'all 0.3s ease';
        element.style.boxSizing = 'border-box';
        
        // Get the actual height after positioning
        const elementHeight = element.offsetHeight || element.getBoundingClientRect().height;
        
        // Update column height
        heights[shortestColumnIndex] += elementHeight + gap;
      });

      columnHeights = heights;
      itemPositions = positions;
      containerHeight = Math.max(...heights) - gap;
      
    } finally {
      isCalculating = false;
    }
  }

  // Recalculate on mount and when columns change
  onMount(() => {
    // Set initial columns
    currentColumns = calculateCurrentColumns();
    
    // Initial layout calculation with delay
    setTimeout(() => {
      calculateLayout();
    }, 50);
    
    // Recalculate on window resize
    const handleResize = (): void => {
      debounceLayout();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (layoutTimeout) {
        clearTimeout(layoutTimeout);
      }
    };
  });

  // Recalculate when columns change (debounced)
  $effect(() => {
    if (currentColumns && container) {
      debounceLayout();
    }
  });

  // Create observers to watch for content changes
  onMount(() => {
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      // Only trigger if the container itself resized, not children
      const containerEntry = entries.find(entry => entry.target === container);
      if (containerEntry) {
        debounceLayout();
      }
    });

    // Observe only the container
    resizeObserver.observe(container);
    
    // Use MutationObserver to watch for new children
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldRecalculate = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          shouldRecalculate = true;
        }
      });
      
      if (shouldRecalculate) {
        debounceLayout();
      }
    });
    
    mutationObserver.observe(container, { 
      childList: true, 
      subtree: false // Only direct children
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  });
</script>

<div 
  bind:this={container}
  class="masonry-container {className} max-sm:flex"
  style="height: {containerHeight}px; position: relative;"
  {...restProps}
>
  {@render children()}
</div>

<style>
  .masonry-container {
    width: 100%;
  }
</style>