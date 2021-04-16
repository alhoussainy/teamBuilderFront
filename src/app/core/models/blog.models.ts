export interface BlogModels {
  id?: string;
  title?: string;
  content?: string;
  category?: number;
  slug?: string;
  published?: boolean;
  image_url?: string;
  picture?:string,
  created_at?: Date,
  updated_at?: Date
}
