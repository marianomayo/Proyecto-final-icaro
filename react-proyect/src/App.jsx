import React from 'react';
import Header from './Component/Headers-Footer/Header';
import Footer from './Component/Headers-Footer/Footer';
import './App.css';
import LogIn from './Component/SignUp-LogIn/LogIn';
import SignUp from './Component/SignUp-LogIn/SignUp';
import Cart from './Component/Cart/Cart';
import ProductList from './Component/ProductList/ProductList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DetailProduct from './Component/Product/DetailProduct';
import { useUserStore } from './Store/useUserStore';
import ProductBackOffice from './Component/BackOffice/ProductBackOffice';

function App() {

  const current_user = useUserStore((state) => state);
  
  const RedirectToHome = () => <Navigate to="/" replace={true} />;

  console.log(current_user);
  
  return (
    <BrowserRouter>
      <>
        <Header />

        <Routes>         
          <Route path="/" element={<ProductList />} />
          
          {current_user.isLogged ? (
            <Route
              path="/login"
              element={<RedirectToHome />}
            />
          ) : (
            <Route path="/login" element={<LogIn />} />
          )}

          {current_user.isLogged ? (
            <Route
              path="/signup"
              element={<RedirectToHome />}
            />
          ) : (
            <Route path="/signup" element={<SignUp />} />
          )}

          {current_user.isLogged ? (
            <Route path="/carrito" element={<Cart />} />
          ) : (
            <Route
              path="/login"
              element={<Navigate to="/login" replace={true} />}
            />
          )}
     

          <Route path="/backproduct"          element={
            current_user.isLogged && current_user.usuario.administrador ? (
              <ProductBackOffice />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />

          <Route path="/detail/:id" element={<DetailProduct />} />
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
