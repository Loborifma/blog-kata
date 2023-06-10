import './ArticleEdit.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ArticleForm from '../ArticleForm';
import Error from '../Error';
import { ICreateArticleData } from '../../models/IArticle';
import { editArticle } from '../../store/reducers/article/articleActions';

const ArticleEdit = () => {
  const dispatch = useAppDispatch();
  const { currentArticle } = useAppSelector((state) => state.articleReducer);

  const toObjectTagArray = (array: string[]) => {
    return array.map((el) => ({ name: el }));
  };

  if (currentArticle) {
    const { title, description, body, tagList, slug } = currentArticle;
    const tags = toObjectTagArray(tagList);

    const successHandler = (article: ICreateArticleData) => {
      dispatch(editArticle(article, slug));
    };

    return (
      <ArticleForm
        defaultValues={{ title, description, body, tagList: tags }}
        onSuccess={(article) => successHandler(article)}
      />
    );
  }

  return <Error text="Не получилось загрузить страницу" />;
};

export default ArticleEdit;
