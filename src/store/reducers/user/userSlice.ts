import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../../models/IUser';
import { IError } from '../../../models/IError';

interface ArticleState {
  user: IUser | null;
  isLoading: boolean;
  error: IError | null;
}

const initialState: ArticleState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUser(state) {
      state.isLoading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
    fetchUserError(state, action: PayloadAction<IError>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
