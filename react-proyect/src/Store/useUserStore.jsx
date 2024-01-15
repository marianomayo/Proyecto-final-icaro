import { create } from "zustand";

export const useUserStore = create((set) => ({
  usuario: {
    userId: null,
    nombre: "",
    apellido: "",
    administrador: false,
    vfullname: "",
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
      },
      isLogged: true,
    });
  },
  logout: () => {
    set({ usuario: { userId: null, nombre: "", apellido: "", administrador: false, vfullname: "" }, isLogged: false });
  },
}));


