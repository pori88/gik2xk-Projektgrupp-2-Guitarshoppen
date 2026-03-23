import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductDetails from './views/ProductDetails.jsx'
import App from './App.jsx'
import Products from './views/Products.jsx'
import Cart from './views/Cart.jsx'
import ProductEdit from './views/ProductEdit.jsx'
import Home from './views/Home.jsx'
import { CartProvider } from "./context/CartContext";
import Login from "./views/Login.jsx";
import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./views/AdminProducts.jsx";
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'productEdit/new',
        element: <ProductEdit />
      },
      {
        path: 'products/:type',
        element: <Products />
      },
      {
        path: 'Cart',
        element: <Cart />
      },
      {
        path: 'product/:id',
        element: <ProductDetails />
      },
      {
        path: "productEdit/:id",
        element: <ProductEdit />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "admin/products",
        element: (
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        )
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);