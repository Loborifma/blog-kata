export interface IArticle {
  author: {
    following: boolean;
    image: string;
    username: string;
    bio: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}
