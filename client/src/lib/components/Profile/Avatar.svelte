<script lang="ts">
    import { generateFromString } from 'generate-avatar'
    const { img_src, user_id } = $props()

    const imageURL = Boolean(img_src) ? img_src :  `data:image/svg+xml;utf8,${generateFromString(user_id)}`
</script>

<div class="h-8 w-8 overflow-hidden">
    <img src={imageURL} alt="profile" class="w-full max-w-8 max-h-8"/>
</div>