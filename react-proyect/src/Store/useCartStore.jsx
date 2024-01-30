import { create } from "zustand";
import axios from "axios";
import {errorModal, confirmMessage} from '../Utilities/Utilities';

export const useCartStore = create((set) => ({
  cart: [],
  cantidad: 0,
  precioTotal: 0,
  addProduct: async (vObj) => {
    try {
     
      const response = await axios.post("/Api/order/addProductToCart",  vObj );
      
      set((state) => ({
        cart: response.data.productos, 
        cantidad: response.data.cantidad,
        precioTotal: response.data.precioTotal
      }));
    } catch (error) { 
      errorModal(error.response.data.msg)
    }
  },
  getProduct: async () => {
    try {
      
      const response = await axios.get("/Api/order/getUserOrder");

      set((state) => ({
        cart: response.data.productos, 
        cantidad: response.data.cantidad,
        precioTotal: response.data.precioTotal
      }));
    } catch (error) {     
      errorModal(error.response.data.msg)
    }
  },
  resetCart: () => {
    set({
      cart: [],
      cantidad: 0,
    });
  },
  deleteProduct: async (vObj) => {
    try {
  
      const response = await axios.post("/Api/order/deleteProduct", vObj);

      // Actualizar el estado con el carrito actualizado
      set((state) => ({
        cart: response.data.productos, 
        cantidad: response.data.cantidad,
        precioTotal: response.data.precioTotal
      }));
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
      errorModal(error.response.data.msg)
    }
  },
}));
