import { Link, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import './SignIn.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUser } from '../../store/reducers/user/userActions';
import Spinner from '../Spinner';

interface FormValue {
  email: string;
  password: string;
}

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, user } = useAppSelector(
    (state) => state.userReducer
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const user = { user: data };
    dispatch(loginUser(user));
  };

  return (
    <div className="sign-in">
      {isLoading && <Spinner />}
      {!isLoading && user && <Navigate to={'/'} replace />}
      {!isLoading && (
        <>
          <form className="sign-in__form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign In</h1>
            <label htmlFor="email">
              Email address
              <input
                className={
                  (errors['email'] || error?.errors['email or password']) &&
                  'error'
                }
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
              {error && error.errors['email or password'] && (
                <span className="error-message">{`Email or password ${error.errors['email or password']}`}</span>
              )}
              <span className="error-message">{errors.email?.message}</span>
            </label>
            <label htmlFor="password">
              Password
              <input
                className={
                  (errors['password'] || error?.errors['email or password']) &&
                  'error'
                }
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
              {error && error.errors['email or password'] && (
                <span className="error-message">{`Email or password ${error.errors['email or password']}`}</span>
              )}
              <span className="error-message">{errors.password?.message}</span>
            </label>
            <button className="sign-in__submit" type="submit">
              <span>Login</span>
            </button>
          </form>
          <span className="sign-in__is-sign-up">
            Don&apos;t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
          </span>
        </>
      )}
    </div>
  );
};

export default SignUp;
