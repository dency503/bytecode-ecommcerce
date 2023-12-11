import api from "../utils/apiConfig";
// Asegúrate de importar tu instancia de axios o la librería que estés utilizando

async function getUsername() {
  try {
    const usernameResponse = await api.get("/v1/auth/username");
    return usernameResponse.data;
  } catch (error) {
    throw error;
  }
}

export { getUsername };
