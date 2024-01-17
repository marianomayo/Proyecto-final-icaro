import { create } from "zustand";

export const useUserStore = create((set) => ({
  usuario: {
    userId: null,
    nombre: "",
    apellido: "",
    administrador: false,
    vfullname: "",
    direccion: "",
    numero: "",
    depto: "",
    email: ""
  },
  isLogged: false,
  login: (userData) => {
    set({
      usuario: {
        userId: userData.userId,
        nombre: userData.nombre,
        apellido: userData.apellido,
        administrador: userData.administrador,
        vfullname: userData.vfullname,
        direccion: userData.direccion,
        numero: userData.numero,
        depto: userData.depto,
        email: userData.email
      },
      isLogged: true,
    });
  },
  logout: () => {
    set(
      { usuario:
         { userId: null,
           nombre: "",
           apellido: "",
           administrador: false, 
           vfullname: "", 
           direccion: "", 
           numero: "", 
           depto: "", 
           email: "" }, isLogged: false });
  },
}));


