import { Routes, Route, Navigate } from 'react-router-dom';

import ArticleList from '../ArticleList';
import ArticleDetails from '../ArticleDetails';
import './App.scss';
import Layout from '../Layout';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import ArticleEdit from '../ArticleEdit';
import ArticleCreate from '../ArticleCreate';
import AuthRequire from '../../hoc/AuthRequire';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<Navigate to={'/'} replace />} />
          <Route path="articles/:slug" element={<ArticleDetails />} />
          <Route
            path="articles/:slug/edit"
            element={
              <AuthRequire>
                <ArticleEdit />
              </AuthRequire>
            }
          />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route
            path="profile"
            element={
              <AuthRequire>
                <EditProfile />
              </AuthRequire>
            }
          />
          <Route
            path="new-article"
            element={
              <AuthRequire>
                <ArticleCreate />
              </AuthRequire>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
