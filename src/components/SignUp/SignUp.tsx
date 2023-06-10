import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

import './SignUp.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registrationUser } from '../../store/reducers/user/userActions';
import Spinner from '../Spinner';

interface FormValue {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  confirm: boolean;
}

const SignUp = () => {
  const location = useLocation();
  const fromPage = location.state?.from || '/';

  const dispatch = useAppDispatch();
  const { error, isLoading, user } = useAppSelector(
    (state) => state.userReducer
  );

  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const { repeatPassword, confirm, ...userData } = data;
    const user = { user: userData };
    dispatch(registrationUser(user));
  };

  return (
    <div className="general-form">
      {isLoading && <Spinner />}
      {!isLoading && user && <Navigate to={fromPage} replace />}
      {!isLoading && (
        <>
          <form
            className="general-form__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>Create new account</h1>
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
              Password
              <input
                className={
                  (errors['password'] || error?.errors['password']) && 'error'
                }
                id="password"
                type="password"
                placeholder="Password"
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
            <label htmlFor="repeatPassword">
              Repeat Password
              <input
                className={
                  (errors['repeatPassword'] ||
                    error?.errors['repeatPassword']) &&
                  'error'
                }
                id="repeatPassword"
                type="password"
                placeholder="Password"
                {...register('repeatPassword', {
                  required: 'This field must be filled',
                  validate: (value) =>
                    value === getValues('password') || 'Passwords must match',
                })}
              />
              <span className="error-message">
                {errors.repeatPassword?.message}
              </span>
            </label>

            <hr />

            <label className="general-form__confirm confirm" htmlFor="confirm">
              <input
                className={`confirm__input ${
                  (errors['confirm'] || error?.errors['confirm']) && 'error'
                }`}
                id="confirm"
                type="checkbox"
                {...register('confirm', {
                  required: true,
                })}
                checked={checked}
                onChange={() => setChecked((checked) => !checked)}
              />
              <span>I agree to the processing of my personal information</span>
            </label>
            {errors.confirm && (
              <span className="error-message">
                You have to agree to the terms
              </span>
            )}
            <button className="general-form__submit" type="submit">
              <span>Create</span>
            </button>
          </form>
          <span className="general-form__is-sign-in">
            Already have an account?{' '}
            <Link to={'/sign-in'} state={{ from: fromPage }}>
              Sign In.
            </Link>
          </span>
        </>
      )}
    </div>
  );
};

export default SignUp;
