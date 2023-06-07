import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './reducers/article/articleSlice';
import userReducer from './reducers/user/userSlice';

const rootReducer = combineReducers({
  articleReducer,
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 300 },
        serializableCheck: { warnAfter: 300 },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
