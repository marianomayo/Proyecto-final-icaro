import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const usePedidos = () => {
    const [pedidosData, setPedidos] = useState([]);
    
    useEffect(() => {
        cargarPedidos();
    }, [])
    
    const cargarPedidos = async () => {
      const resp = await axios.get('/Api/pedido/getAll')
      const product = await resp.data;
      setPedidos(product.data)
    }

   

  

   
    return {
        pedidosData,
        cargarPedidos     
    }
}

