import { useState } from "react";

import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BusquedaProducto,
  ListaCategoria,
  Header,
  Nav,
  Footer,
} from "@/components/common";
import {
  Home,
  Account,
  SignInForm,
  ViewProduct,
  CheckOut,
  SignUpForm,
} from "@/views";
import { UserCartProvider } from "./../hooks/UserCartProvider";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./ClientRoute";
import {
  Page404,
  AdminPanel,
  GestionarProducto,
  GestionarCategoria,
  GestionarMarca,
  GestionarEmpleado,
  GestionarCargo,
  GestionarProveedor,
  GestionarClientes,
  GestionarVenta,
} from "@/views";

import * as ROUTES from "@/constants/routes";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// En tu componente o archivo principal
import "bootstrap/dist/css/bootstrap.min.css";
import { BasketProvider } from "../components/basket/BasketContext";
import Basket from "../components/basket/Basket";

// Import AboutUs if it exists
// import AboutUs from "@/views/AboutUs";

const stripePromise = loadStripe(
  "pk_test_51NSnNyHIuJM4DUM4d2HAjUjbbZL6ohUetGKHwFKkKVOOIf7c5HxpRaBiZX6oANuJLnIkwPXeaqK4cpufWH9tdNEr00ZuUTIv2u"
);
const AppRouter = () => {
  return (
    <>
      <UserCartProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <BasketProvider>
              <Header />
              <Basket />{" "}
            </BasketProvider>
            <Nav />

            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route
                path={ROUTES.SIGN_UP}
                element={
                  <PublicRoute component={SignUpForm} path={ROUTES.SIGN_UP} />
                }
              />
              <Route
                path={ROUTES.SIGN_IN}
                element={
                  <PublicRoute component={SignInForm} path={ROUTES.SIGN_IN} />
                }
              />
              <Route
                path={ROUTES.ACCOUNT}
                element={
                  <PrivateRoute component={Account} path={ROUTES.ACCOUNT} />
                }
              />
              <Route path={ROUTES.BUSQUEDA} element={<BusquedaProducto />} />
              <Route path={ROUTES.VIEW_PRODUCT} element={<ViewProduct />} />
              <Route
                path={ROUTES.LISTA_CATEGORIA}
                element={<ListaCategoria />}
              />

              {/* Admin Routes */}
              <Route
                path={ROUTES.ADMIN_DASHBOARD}
                element={
                  <AdminRoute
                    component={AdminPanel}
                    path={ROUTES.ADMIN_DASHBOARD}
                  />
                }
              />

              <Route
                path={ROUTES.ADMIN_PRODUCTO}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_PRODUCTO}
                    component={GestionarProducto}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_CATEGORIAS}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_CATEGORIAS}
                    component={GestionarCategoria}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_MARCAS}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_MARCAS}
                    component={GestionarMarca}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_EMPLEADOS}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_EMPLEADOS}
                    component={GestionarEmpleado}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_CLIENTES}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_CLIENTES}
                    component={GestionarClientes}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_CARGOS}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_CARGOS}
                    component={GestionarCargo}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_VENTAS}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_VENTAS}
                    component={GestionarVenta}
                  />
                }
              />
              <Route
                path={ROUTES.ADMIN_PROVEEDORES}
                element={
                  <AdminRoute
                    path={ROUTES.ADMIN_PROVEEDORES}
                    component={GestionarProveedor}
                  />
                }
              />

              <Route path={ROUTES.CHECKOUT} element={<CheckOut />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </Router>
        </Elements>
      </UserCartProvider>
    </>
  );
};

export default AppRouter;
