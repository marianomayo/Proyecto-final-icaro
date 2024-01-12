import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const useProduct = () => {
    const [productData, setProduct] = useState([]);
    const [maxAndMinPrice, setMaxAndMinPrice] = useState([]);
    
    useEffect(() => {
      loadProduct();
      getMaxAndMinProductPrice();
    }, [])
    
    const loadProduct = async () => {
      const resp = await axios.get('/Api/product/getAll')
      const product = await resp.data;
      setProduct(product.data)
    }

    const getMaxAndMinProductPrice = async () => {
      const resp = await axios.get('/Api/product/getPrecioMinimoYMaximo')
      const priceMaxAndMin = await resp.data;
      setMaxAndMinPrice(priceMaxAndMin.data)
    }

  

   
    return {
        productData,
        maxAndMinPrice       
    }
}

