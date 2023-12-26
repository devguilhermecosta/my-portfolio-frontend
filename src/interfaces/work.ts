export interface WorkProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  link?: string;
  cover: string;
  create_at: string;
  images: ImageWorkProps[];
}

export interface ImageWorkProps {
  id: number;
  work_id: number;
  url: string;
}