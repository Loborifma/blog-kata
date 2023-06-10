import { List } from 'antd';
import { useEffect } from 'react';

import Article from '../Article';
import './ArticleList.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchArticles } from '../../store/reducers/article/articleActions';
import Spinner from '../Spinner';
import Error from '../Error';
import Pagination from '../Pagination';

const ArticleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articleData, currentPage, currentArticle, error, isLoading } =
    useAppSelector((state) => state.articleReducer);

  const { user: userStore } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [currentPage, currentArticle]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      dispatch(fetchArticles(currentPage));
    }
  }, [userStore]);

  return (
    <main className="article-list">
      {isLoading && <Spinner />}
      {error && <Error text={error.errors['message']} />}
      {articleData.articles && !error && !isLoading && (
        <>
          <List
            dataSource={articleData.articles}
            renderItem={(item) => {
              return (
                <List.Item key={item.slug}>
                  <Article {...item} />
                </List.Item>
              );
            }}
          />
          <div className="article-list__pagination">
            <Pagination />
          </div>
        </>
      )}
    </main>
  );
};

export default ArticleList;
