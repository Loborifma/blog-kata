import { Link } from 'react-router-dom';

import likeIcon from '../../assets/icons/LikeNotClicked.svg';
import profileIcon from '../../assets/images/ProfileIcon.png';
import { cutText, formatDate } from '../../utils/textHandler';

import './Article.scss';

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
  createdAt: string;
  alphaOfDescription?: number;
  isDetailed?: boolean;
}

const Article = ({
  title,
  favoritesCount,
  tagList,
  slug,
  description,
  author,
  createdAt,
  alphaOfDescription = 1,
  isDetailed = false,
}: IArticleProps) => {
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
        {tagList && (
          <ul className="article__tag-list">
            {tagList.map((element: string, index: number) => {
              return <li key={index}>{element}</li>;
            })}
          </ul>
        )}
        <p
          className="article__description"
          style={{ opacity: alphaOfDescription }}
        >
          {cutText(description || '', false)}
        </p>
      </div>
      <div className="article__profile-info">
        <div>
          <span>{author.username}</span>
          <span>{formatDate(createdAt)}</span>
        </div>
        <div className="article__profile-icon">
          <img src={author.image || profileIcon} alt="Фото профиля" />
        </div>
      </div>
    </article>
  );
};

export default Article;
