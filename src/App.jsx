import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '@layout/Layout';
import Login from '@pages/Login/Login';
import Home from '@pages/Home/Home.jsx';
import SearchPage from '@pages/Search/SearchPage';
import Post from '@pages/Post/Post';
import Chat from '@pages/Chat/Chat';
import Signup from '@pages/Signup/Signup';
import ProductDetail from '@pages/ProductDetail/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="post" element={<Post />} />
          <Route path="detail" element={<ProductDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="chat" element={<Chat />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
