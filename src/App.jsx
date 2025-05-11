import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from '@layout/Layout';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} /> <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
