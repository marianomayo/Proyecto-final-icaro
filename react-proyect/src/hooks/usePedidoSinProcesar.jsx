import { useState, useEffect } from 'react';

const usePedidoStore = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    
    const obtenerPedidos = async () => {
      try {
        
        const response = await fetch('/Api/pedido/getPedidosSinProcesar');
        const data = await response.json();

        
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      }
    };

    
    obtenerPedidos();

   
    const intervalId = setInterval(obtenerPedidos, 60000);

    
    return () => clearInterval(intervalId);
  }, []); 

  return pedidos;
};

export default usePedidoStore;
