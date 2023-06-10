import { ICreateArticleData } from '../../../models/IArticle';
import { AppDispatch } from '../../store';

import { articleSlice } from './articleSlice';

const BASE_URL = 'https://blog.kata.academy/api';

export function fetchArticles(page = 1) {
  return async (dispatch: AppDispatch) => {
    const currentPage = (page - 1) * 5;
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    dispatch(articleSlice.actions.fetchArticle());
    const response = await fetch(
      `${BASE_URL}/articles?limit=5&offset=${currentPage}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.user?.token}`,
        },
      }
    );
    const data = await response.json();
    if (data.errors) {
      dispatch(articleSlice.actions.fetchArticleError(data));
    } else {
      dispatch(articleSlice.actions.setPage(page));
      dispatch(articleSlice.actions.fetchArticleSuccess(data));
    }
  };
}

export function getArticleBySlug(slug: string | undefined) {
  return async (dispatch: AppDispatch) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    dispatch(articleSlice.actions.fetchArticle());
    const response = await fetch(`${BASE_URL}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.user?.token}`,
      },
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(articleSlice.actions.fetchArticleError(data));
    } else {
      dispatch(articleSlice.actions.getArticle(data.article));
    }
  };
}

export function createArticle(article: ICreateArticleData) {
  return async (dispatch: AppDispatch) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    dispatch(articleSlice.actions.fetchArticle());
    const response = await fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.user.token}`,
      },
      body: JSON.stringify(article),
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(articleSlice.actions.fetchArticleError(data));
    } else {
      dispatch(articleSlice.actions.getArticle(data.article));
    }
  };
}

export function editArticle(article: ICreateArticleData, slug: string) {
  return async (dispatch: AppDispatch) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    dispatch(articleSlice.actions.fetchArticle());
    const response = await fetch(`${BASE_URL}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.user.token}`,
      },
      body: JSON.stringify(article),
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(articleSlice.actions.fetchArticleError(data));
    } else {
      dispatch(articleSlice.actions.getArticle(data.article));
    }
  };
}

export function favoriteArticle(slug: string) {
  return async (dispatch: AppDispatch) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(articleSlice.actions.fetchArticleError(data));
    } else {
      dispatch(articleSlice.actions.getArticle(data.article));
    }
  };
}

export function unFavoriteArticle(slug: string) {
  return async (dispatch: AppDispatch) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    const response = await fetch(`${BASE_URL}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(articleSlice.actions.fetchArticleError(data));
    } else {
      dispatch(articleSlice.actions.getArticle(data.article));
    }
  };
}

export function deleteArticle(slug: string) {
  return async (dispatch: AppDispatch) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    dispatch(articleSlice.actions.fetchArticle());
    await fetch(`${BASE_URL}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    dispatch(articleSlice.actions.deleteArticles());
  };
}
