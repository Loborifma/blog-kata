import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { getArticleBySlug } from '../../store/actions';
import Article from '../Article';
import './ArticleDetails.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Spinner from '../Spinner';
import Error from '../Error';

const ArticleDetails: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { currentArticle, isLoading, error } = useAppSelector(
    (state) => state.articleReducer
  );

  useEffect(() => {
    dispatch(getArticleBySlug(slug));
  }, []);

  return (
    <main className="article-details">
      {isLoading && (
        <div className="article-details__spinner">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="article-details__error">
          <Error text={error} />
        </div>
      )}
      {!isLoading && !error && currentArticle && (
        <>
          <Article
            {...currentArticle}
            alphaOfDescription={0.5}
            isDetailed={true}
          />
          <div className="article-details__content">
            <ReactMarkdown>{currentArticle.body}</ReactMarkdown>
          </div>
        </>
      )}
    </main>
  );
};

export default ArticleDetails;
