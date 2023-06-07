import { AppDispatch } from '../../store';

import { articleSlice } from './articleSlice';

const BASE_URL = 'https://blog.kata.academy/api';

export function fetchArticles(page = 1) {
  return async (dispatch: AppDispatch) => {
    try {
      const currentPage = (page - 1) * 5;
      dispatch(articleSlice.actions.fetchArticle());
      const response = await fetch(
        `${BASE_URL}/articles?limit=5&offset=${currentPage}`,
        {
          method: 'GET',
        }
      ).then((res) => (res.ok ? res : Promise.reject(res)));
      const data = await response.json();
      dispatch(articleSlice.actions.setPage(page));
      dispatch(articleSlice.actions.fetchArticleSuccess(data));
    } catch (error) {
      dispatch(
        articleSlice.actions.fetchArticleError(
          'Произошла ошибка при загрузке статей'
        )
      );
    }
  };
}

export function getArticleBySlug(slug: string | undefined) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(articleSlice.actions.fetchArticle());
      const response = await fetch(`${BASE_URL}/articles/${slug}`, {
        method: 'GET',
      }).then((res) => (res.ok ? res : Promise.reject(res)));
      const data = await response.json();
      dispatch(articleSlice.actions.getArticle(data.article));
    } catch (error) {
      dispatch(
        articleSlice.actions.fetchArticleError(
          'Произошла ошибка при загрузке статьи'
        )
      );
    }
  };
}
