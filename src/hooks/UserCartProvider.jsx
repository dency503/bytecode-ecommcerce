import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/apiConfig";


const UserCartContext = createContext();

export const useUserCart = () => {
  return useContext(UserCartContext);
};

export const UserCartProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    try {
      const usernameResponse = await api.get("/v1/auth/username");
      setName(usernameResponse.data);

      const cartResponse = await api.get("/carrito/");
      setCart(cartResponse.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData();
    } else {
      console.log("No hay token de usuario.");
    }
  }, []);

  return (
    <UserCartContext.Provider value={{ name, cart, fetchData }}>
      {children}
    </UserCartContext.Provider>
  );
};