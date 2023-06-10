export interface IArticle {
  author: {
    following: boolean;
    image: string;
    username: string;
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

export interface ICreateArticleData {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
