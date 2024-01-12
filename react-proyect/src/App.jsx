import React, { useEffect, useState } from 'react';
import Header from './Component/Headers-Footer/Header';
import Footer from './Component/Headers-Footer/Footer';
import './App.css';
import LogIn from './Component/SignUp-LogIn/LogIn';
import SignUp from './Component/SignUp-LogIn/SignUp'
import Cart from './Component/Cart/Cart';
import ProductList from './Component/ProductList/ProductList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailProduct from './Component/Product/DetailProduct';


function App() {


  return (
    <BrowserRouter>
      <>
        <Header />

        <Routes>
      
          <Route path="/" element={<ProductList />} />    
          <Route path="/login" element={<LogIn />} />   
          <Route path="/signup" element={<SignUp />} />   
          <Route path="/carrito" element={<Cart />} />   
          <Route path="/detail/:id" element={<DetailProduct />} />   
        </Routes>

        <Footer />
      </>
    </BrowserRouter>
  );
};



export default App;
