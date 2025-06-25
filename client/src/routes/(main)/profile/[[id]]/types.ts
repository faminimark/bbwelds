export interface Image {
    image_url: string;
    status: string;
    image_type: string;
    image_id: string;
    imageable_id: string;
    }

export interface Post {
    title: string;
    description: string;
    created_at: string;
    post_id: string;
    user_id: string;
    images: Image[];
    }

export type PostsByYear = Record<string, Post[]>[];