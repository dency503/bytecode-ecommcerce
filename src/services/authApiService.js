import axios from "axios";
import api from "../utils/apiConfig";
import { toast } from "react-toastify";
import { setToken } from "../redux/actions/tokenActions";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const authApiService = {
  signIn: async (email, password) => {
    try {
      const response = await axios.post(
        `${apiUrl}/v1/auth/signin`,
        { email, password },
        {
          withCredentials: true,
        }
      );

      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      return response.data.token;
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);

      // Dispatch action to set token error

      throw error;
    }
  },
};
 async function getCart() {
  try {
   

    const cartResponse = await api.get("/carrito");
    return cartResponse.data;
  } catch (error) {
    toast.error("Error al obtener datos:", error);
  }
};
async function modifyUser(clienteData) {
  try {
    // Supongo que clienteData se debe pasar como data en la solicitud PUT
    const usernameResponse = await api.put("/v1/auth/user", clienteData);
    return usernameResponse.data;
  } catch (error) {
    throw error;
  }
}
async function modifyToCart(id, nuevaCantidad) {
  try {
    await api.put(`/carrito/${id}/${nuevaCantidad}`);

    toast.success("Has cambiado la cantidad exitosamente");
  } catch (error) {
    toast.error("Error al modificar el carrito:", error);
  }
}

async function addToCart(id) {
  try {
    const response = await api.post(`/carrito/${id}/1`);

    toast.success("Producto agregado");
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
}

async function deleteFromCart(id) {
  try {
    const response = await api.delete(`/carrito/item/${id}`);

    if (response.status === 200) {
      // Successful deletion, perform additional actions if necessary

      toast.success("Elemento eliminado del carrito con éxito.");
      // Perform other actions after successful deletion if needed
    } else {
      // Unsuccessful deletion, handle the error if necessary
      toast.error("Error al eliminar el elemento del carrito.");
    }
  } catch (error) {
    // Network error or other error, handle the error if necessary
    toast.error(
      "Error de red al intentar eliminar el elemento del carrito.",
      error
    );
  }
}
async function modifyAddress(clienteData) {
  try {
    // Supongo que clienteData se debe pasar como data en la solicitud PUT
    const usernameResponse = await api.put("/direcciones/user", clienteData);
    return usernameResponse.data;
  } catch (error) {
    throw error;
  }
}

async function getUsername() {
  try {
    const usernameResponse = await api.get("/v1/auth/user");
    return usernameResponse.data;
  } catch (error) {
    throw error;
  }
}

export {
  getUsername,
  authApiService,
  modifyUser,
  modifyAddress,
  deleteFromCart,
  modifyToCart,
  addToCart,getCart
};
