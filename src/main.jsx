import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { signOut } from "./redux/actions/authActions.js";
import configureStore from "@/redux/store/store";
import jwtDecode from "jwt-decode";

const { store, persistor } = configureStore();

const RootComponent = () => {
  // Dispatch the signOut action when the component mounts
  const token = localStorage.getItem("token");

  const handleTokenExpiration = () => {
    // Verificar si hay un token almacenado
    if (token) {
      try {
        // Decodificar el token
        const decodedToken = jwtDecode(token);

        // Obtener la fecha de expiración en milisegundos
        const expirationDate = decodedToken.exp * 1000;

        // Verificar si el token ha expirado
        if (Date.now() >= expirationDate) {
          // Token expirado, eliminar el token y manejar la lógica de redirección o mensaje al usuario
          localStorage.removeItem("token");
          store.dispatch(signOut());
          // Por ejemplo, redirigir al usuario a la página de inicio de sesión
          // o mostrar un mensaje indicando que se requiere inicio de sesión
          // Puedes manejar esto aquí o usar una función externa para manejar el redireccionamiento
          // redirectToLoginPage();
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
        // o mostrar un mensaje de error al usuario
        // Puedes manejar esto aquí o usar una función externa para manejar el redireccionamiento
        // redirectToLoginPage();
      }
    } else {
      // Si no hay token, puedes manejarlo aquí
      // Por ejemplo, redirigir al usuario a la página de inicio de sesión
      // o mostrar un mensaje indicando que se requiere inicio de sesión
      // Puedes manejar esto aquí o usar una función externa para manejar el redireccionamiento
      // redirectToLoginPage();
    }
  };

  // Llamar a la función handleTokenExpiration en cada renderizado del componente
  useEffect(() => {
    handleTokenExpiration();
  }, []);

  return (
    <Provider store={store}>
      <App store={store} persistor={persistor} />
    </Provider>
  );
};

ReactDOM.render(<RootComponent />, document.getElementById("root"));
