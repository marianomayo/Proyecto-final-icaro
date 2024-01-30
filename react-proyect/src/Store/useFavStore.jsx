import { create } from "zustand";
import axios from "axios";
import {errorModal, confirmMessage} from '../Utilities/Utilities';

export const useFavStore = create((set) => ({
  fav: [],
  cantidad: 0,
  addProductToFav: async (vObj) => {
    try {
      
      const response = await axios.post("/Api/favorito/addProductToFav",  vObj );
   
      if(response.status == 200){
        const modal = confirmMessage(response.data.msg);    
              
        setTimeout(() => {
            modal.destroy();
        }, 2000);
      }
      
      set((state) => ({
        fav: response.data.producto, 
        cantidad: response.data.cantidad,
      }));
    } catch (error) { 
      errorModal(error.response.data.msg)
    }
  },
  getFav: async () => {
    try {
      
      const response = await axios.get("/Api/favorito/getFavByUser");
      console.log(response)
      set((state) => ({
        fav: response.data.producto, 
        cantidad: response.data.cantidad,      
      }));
    } catch (error) {     
      errorModal(error.response.data.msg)
    }
  },
  resetFav: () => {
    set({
      fav: [],
      cantidad: 0,
    });
  },
  deleteProductFav: async (vObj) => {
    try {
     
      const response = await axios.post("/Api/favorito/deleteProductFav", vObj);

      // Actualizar el estado con el carrito actualizado
      set((state) => ({
        fav: response.data.producto, 
        cantidad: response.data.cantidad,       
      }));
    } catch (error) {
      console.error("Error al eliminar el producto de favorito", error);
      errorModal(error.response.data.msg)
    }
  },
}));
