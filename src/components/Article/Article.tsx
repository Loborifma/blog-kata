import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Popconfirm } from 'antd';

import likeIcon from '../../assets/icons/LikeNotClicked.svg';
import profileIcon from '../../assets/images/ProfileIcon.png';
import { cutText, formatDate } from '../../utils/textHandler';
import './Article.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteArticle } from '../../store/reducers/article/articleActions';

interface IArticleProps {
  author: {
    image: string;
    username: string;
  };
  title: string;
  favoritesCount: number;
  tagList?: string[];
  slug: string;
  description?: string;
  updatedAt: string;
  isDetailed?: boolean;
}

const Article = ({
  title,
  favoritesCount,
  tagList,
  slug,
  description,
  author,
  updatedAt,
  isDetailed = false,
}: IArticleProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <article className="article">
      <div className="article__article-info">
        <div>
          {isDetailed ? (
            <h1 className="article__title">{cutText(title, true)}</h1>
          ) : (
            <Link className="article__title" to={`/articles/${slug}`}>
              {cutText(title, true)}
            </Link>
          )}
          <div className="article__like-icon">
            <img src={likeIcon} alt="like" />
          </div>
          <span className="article__likes">{favoritesCount}</span>
        </div>
        {tagList && tagList.join('') && (
          <ul className="article__tag-list">
            {tagList.map((element: string, index: number) => {
              return <li key={index}>{cutText(element, true)}</li>;
            })}
          </ul>
        )}
        <p
          className="article__description"
          style={{ opacity: isDetailed ? 0.5 : 1 }}
        >
          {cutText(description || '', false)}
        </p>
      </div>
      <div className="article__profile-info">
        <div>
          <div>
            <span>{author.username}</span>
            <span>{formatDate(updatedAt)}</span>
          </div>
          <div className="article__profile-icon">
            <img src={author.image || profileIcon} alt="Фото профиля" />
          </div>
        </div>
        {isDetailed && isLogin && (
          <div>
            <Popconfirm
              title="Are you sure to delete this article?"
              placement="rightTop"
              cancelText="No"
              okText="Yes"
              onConfirm={() => {
                dispatch(deleteArticle(slug));
                navigate('/');
              }}
            >
              <button className="article__delete" type="button">
                Delete
              </button>
            </Popconfirm>
            <Link className="article__edit" to={`/articles/${slug}/edit`}>
              Edit
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default Article;
