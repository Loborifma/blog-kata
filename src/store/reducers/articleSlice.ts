import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IArticle } from '../../models/IArticle';

interface ArticleData {
  articles: IArticle[];
  articlesCount: number;
}

interface ArticleState {
  articleData: ArticleData;
  currentPage: number;
  currentArticle: IArticle | null;
  isLoading: boolean;
  error: string;
}

const initialState: ArticleState = {
  articleData: {
    articles: [],
    articlesCount: 0,
  },
  currentPage: 1,
  currentArticle: null,
  isLoading: false,
  error: '',
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    fetchArticle(state) {
      state.isLoading = true;
    },
    fetchArticleSuccess(state, action: PayloadAction<ArticleData>) {
      state.isLoading = false;
      state.error = '';
      state.currentArticle = null;
      state.articleData.articles = action.payload.articles;
      state.articleData.articlesCount = action.payload.articlesCount;
    },
    fetchArticleError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    getArticle(state, action: PayloadAction<IArticle>) {
      state.currentArticle = action.payload;
      state.isLoading = false;
      state.error = '';
    },
  },
});

export default articleSlice.reducer;
