import './ArticleCreate.scss';
import { useAppDispatch } from '../../hooks/redux';
import ArticleForm from '../ArticleForm';
import { ICreateArticleData } from '../../models/IArticle';
import { createArticle } from '../../store/reducers/article/articleActions';

const ArticleCreate = () => {
  const dispatch = useAppDispatch();

  const successHandler = (article: ICreateArticleData) => {
    dispatch(createArticle(article));
  };

  return (
    <ArticleForm
      defaultValues={{ tagList: [{ name: '' }] }}
      onSuccess={(article) => successHandler(article)}
    />
  );
};

export default ArticleCreate;
