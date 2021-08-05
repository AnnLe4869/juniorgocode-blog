type DefaultType = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type User = Record<"username" | "email", string> & DefaultType;

export type Post = Record<
  "title" | "description" | "content" | "slug",
  string
> & {
  imageCover: {
    url: string;
  };
} & DefaultType;
