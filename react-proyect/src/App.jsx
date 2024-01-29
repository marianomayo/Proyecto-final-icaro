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
import NuevoProducto from './Component/BackOffice/NuevoProducto';
import Pedidos from './Component/Pedidos/Pedidos';
import ErrorPage from './Component/ErrorPage/ErrorPage';


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

               
          
          <Route
            path="/carrito"
            element={
              current_user.isLogged ? (
                current_user.usuario.administrador ? (
                  <ErrorPage status={403} message={'Atención. Usted no posee acceso a esta pagina'}/>
                ) : (
                  <Cart />
                )
              ) : (
                <LogIn />
              )
            }
          />


          <Route
            path="/backproduct"
            element={
              current_user.isLogged && current_user.usuario.administrador ? (
                <ProductBackOffice />
              ) : (
                <ErrorPage status={403} message={'Atención. Usted no posee acceso a esta pagina'}/>
              )
            }
          />

            
          <Route
            path="/nuevoproducto"
            element={
              current_user.isLogged && current_user.usuario.administrador ? (
                <NuevoProducto />
              ) : (
                <ErrorPage status={403} message={'Atención. Usted no posee acceso a esta pagina'}/>
              )
            }
          />


          
          <Route
            path="/pedidos"
            element={
              current_user.isLogged && current_user.usuario.administrador ? (
                <Pedidos />
              ) : (
                <ErrorPage status={403} message={'Atención. Usted no posee acceso a esta pagina'}/>
              )
            }
          />



          <Route path="/detail/:id" element={<DetailProduct />} />

          <Route path="*" element={<ErrorPage status={404} message={'La pagina a la cual intentas acceder no existe'} />} />
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
