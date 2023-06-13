import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';

import './EditProfile.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Spinner from '../Spinner';
import { editUser } from '../../store/reducers/user/userActions';
import useAuth, { getCurrentUser } from '../../hooks/useAuth';

interface FormValue {
  username: string;
  email: string;
  password: string;
  image: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    user: userStore,
  } = useAppSelector((state) => state.userReducer);
  const [user] = useAuth(userStore);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const goBack = () => {
    if (JSON.stringify(errors) === '{}') {
      navigate(fromPage);
    }
  };

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    if (user) {
      const userData = { user: data, token: user.user.token };
      dispatch(editUser(userData));
      goBack();
    }
  };

  useEffect(() => {
    const userParsed = getCurrentUser();
    if (!userParsed) {
      navigate('/');
    }
  });

  return (
    <div className="edit">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <form className="edit__form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Edit profile</h1>
            <label htmlFor="username">
              Username
              <input
                className={
                  (errors['username'] || error?.errors['username']) && 'error'
                }
                id="username"
                type="text"
                placeholder="Username"
                {...register('username', {
                  required: 'This field must be filled',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 symbols',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username must be under 20 symbols',
                  },
                })}
              />
              {error && error.errors['username'] && (
                <span className="error-message">{`Username ${error.errors['username']}`}</span>
              )}
              <span className="error-message">{errors.username?.message}</span>
            </label>
            <label htmlFor="email">
              Email address
              <input
                className={
                  (errors['email'] || error?.errors['email']) && 'error'
                }
                id="email"
                type="text"
                placeholder="Email address"
                {...register('email', {
                  required: 'This field must be filled',
                  pattern: {
                    value: /^[a-z]+@\w+\.\w+/g,
                    message: 'Invalid email, example abc@bca.com',
                  },
                })}
              />
              {error && error.errors['email'] && (
                <span className="error-message">{`Email ${error.errors['email']}`}</span>
              )}
              <span className="error-message">{errors.email?.message}</span>
            </label>
            <label htmlFor="password">
              New password
              <input
                className={
                  (errors['password'] || error?.errors['password']) && 'error'
                }
                id="password"
                type="password"
                placeholder="New password"
                {...register('password', {
                  required: 'This field must be filled',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 symbols',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Password must be under 40 symbols',
                  },
                })}
              />
              <span className="error-message">{errors.password?.message}</span>
            </label>
            <label htmlFor="image">
              Avatar image (url)
              <input
                className={
                  (errors['image'] || error?.errors['image']) && 'error'
                }
                id="image"
                type="text"
                placeholder="Avatar image"
                {...register('image', {
                  required: 'This field must be filled',
                  pattern: {
                    value:
                      /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/g,
                    message:
                      'URL must be correct. Example "https://www.example.com"',
                  },
                })}
              />
              <span className="error-message">{errors.image?.message}</span>
            </label>
            <button className="edit__submit" type="submit">
              <span>Save</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditProfile;
