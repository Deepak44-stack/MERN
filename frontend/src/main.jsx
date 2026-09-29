import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './components/index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from "react-router";
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={App}>
        <Route index Component={HomePage} />
        <Route path="products" Component={HomePage} />
        <Route path="product/:id" Component={ProductDetailPage} />
        <Route path="cart" Component={Cart} />
        <Route path="login" Component={Login} />
      </Route>
    </Routes>
  </BrowserRouter>
)
