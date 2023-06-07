import { Routes, Route } from 'react-router-dom';

import ArticleList from '../ArticleList';
import ArticleDetails from '../ArticleDetails';
import './App.scss';
import Layout from '../Layout';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticleDetails />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
