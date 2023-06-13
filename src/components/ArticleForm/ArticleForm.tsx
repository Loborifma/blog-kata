import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';

import './ArticleForm.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Spinner from '../Spinner';
import {
  createArticle,
  editArticle,
} from '../../store/reducers/article/articleActions';
import { getCurrentUser } from '../../hooks/useAuth';

interface FormValue {
  title: string;
  description: string;
  body: string;
  tagList: { name: string }[];
}

const toObjectTagArray = (array: string[]) => {
  return array.map((el) => ({ name: el }));
};

const ArticleForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, currentArticle } = useAppSelector(
    (state) => state.articleReducer
  );
  const user = getCurrentUser();
  const [isUsersArticle, setIsUsersArticle] = useState(false);

  let defaultValues;

  useEffect(() => {
    setIsUsersArticle(user?.user.username === currentArticle?.author.username);
  }, []);

  if (currentArticle && isUsersArticle) {
    const tags = toObjectTagArray(currentArticle.tagList);
    defaultValues = { ...currentArticle, tagList: tags };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValue>({
    defaultValues: defaultValues || { tagList: [{ name: '' }] },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const [prevCurrentArticle] = useState(currentArticle);

  const openCurrentArticle = () => {
    if (JSON.stringify(errors) === '{}' && currentArticle) {
      currentArticle !== prevCurrentArticle &&
        navigate(`/articles/${currentArticle.slug}`, { replace: true });
    }
  };

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const toStringArray = data.tagList.map((element) => element.name);
    const article = {
      article: {
        ...data,
        tagList: toStringArray,
      },
    };
    currentArticle && isUsersArticle
      ? dispatch(editArticle(article, currentArticle.slug))
      : dispatch(createArticle(article));
  };

  useEffect(() => {
    openCurrentArticle();
  }, [currentArticle]);

  return (
    <div className="article-form">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <form
            className="article-form__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>Create new article</h1>
            <label htmlFor="title">
              Title
              <input
                className={
                  (errors['title'] || error?.errors['title']) && 'error'
                }
                id="title"
                type="body"
                placeholder="Title"
                {...register('title', {
                  required: 'This field must be filled',
                })}
              />
              {error && error.errors['username'] && (
                <span className="error-message">{`Username ${error.errors['username']}`}</span>
              )}
              <span className="error-message">{errors.title?.message}</span>
            </label>
            <label htmlFor="description">
              Short description
              <input
                className={
                  (errors['description'] || error?.errors['description']) &&
                  'error'
                }
                id="description"
                type="body"
                placeholder="Title"
                {...register('description', {
                  required: 'This field must be filled',
                })}
              />
              {error && error.errors['description'] && (
                <span className="error-message">{`Short description ${error.errors['description']}`}</span>
              )}
              <span className="error-message">
                {errors.description?.message}
              </span>
            </label>
            <label htmlFor="body">
              Short description
              <textarea
                className={(errors['body'] || error?.errors['body']) && 'error'}
                id="body"
                placeholder="Title"
                {...register('body', {
                  required: 'This field must be filled',
                })}
              />
              <span className="error-message">{errors.body?.message}</span>
            </label>
            <label htmlFor="tagList">
              Tags
              <div className="article-form__tags">
                <div>
                  {fields.map((field, index, array) => (
                    <div className="article-form__tags-field" key={field.id}>
                      <input
                        type="body"
                        id="tagList"
                        placeholder="Tag"
                        {...register(`tagList.${index}.name` as const)}
                      />
                      <button
                        type="button"
                        onClick={() => array.length > 1 && remove(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => append({ name: '' })}>
                  Add tag
                </button>
              </div>
            </label>
            <button className="article-form__submit" type="submit">
              <span>Send</span>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ArticleForm;
