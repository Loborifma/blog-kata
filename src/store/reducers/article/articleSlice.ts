import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IArticle } from '../../../models/IArticle';
import { IError } from '../../../models/IError';

interface ArticleData {
  articles: IArticle[];
  articlesCount: number;
}

interface ArticleState {
  articleData: ArticleData;
  currentPage: number;
  currentArticle: IArticle | null;
  isLoading: boolean;
  error: IError | null;
}

const initialState: ArticleState = {
  articleData: {
    articles: [],
    articlesCount: 0,
  },
  currentPage: 1,
  currentArticle: null,
  isLoading: false,
  error: null,
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
      state.error = null;
      state.currentArticle = null;
      state.articleData.articles = action.payload.articles;
      state.articleData.articlesCount = action.payload.articlesCount;
    },
    fetchArticleError(state, action: PayloadAction<IError>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    getArticle(state, action: PayloadAction<IArticle>) {
      state.currentArticle = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    deleteArticles(state) {
      state.currentArticle = null;
    },
  },
});

export default articleSlice.reducer;
