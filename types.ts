type DefaultType = {
  id: string;
  date: string;
};

export type User = Record<"username" | "email", string> & DefaultType;

export type Post = Record<"title" | "description" | "content", string> &
  DefaultType;
