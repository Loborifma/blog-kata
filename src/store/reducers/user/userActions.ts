import {
  IEditProfileData,
  ILoginData,
  IRegistrationData,
} from '../../../models/IUser';
import { AppDispatch } from '../../store';

import { userSlice } from './userSlice';

const BASE_URL = 'https://blog.kata.academy/api';

export function registrationUser(user: IRegistrationData) {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.fetchUser());
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(userSlice.actions.fetchUserError(data));
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(userSlice.actions.fetchUserSuccess(data));
    }
  };
}

export function loginUser(user: ILoginData) {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.fetchUser());
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(userSlice.actions.fetchUserError(data));
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(userSlice.actions.fetchUserSuccess(data));
    }
  };
}

export function editUser(user: IEditProfileData) {
  return async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.fetchUser);
    const response = await fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.errors) {
      dispatch(userSlice.actions.fetchUserError(data));
    } else {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(userSlice.actions.fetchUserSuccess(data));
    }
  };
}
