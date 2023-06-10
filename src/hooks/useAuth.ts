import { useState, useEffect } from 'react';

import { IUser } from '../models/IUser';

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  const userParsed: IUser | null = userJson ? JSON.parse(userJson) : null;
  return userParsed;
};

const useAuth = (dependency?: any): [IUser | null, () => void] => {
  const [user, setUser] = useState(getCurrentUser());

  const clearValue = () => {
    setUser(null);
  };

  useEffect(() => {
    const userParsed = getCurrentUser();

    setUser(userParsed);
  }, [dependency]);

  return [user, clearValue];
};

export default useAuth;
