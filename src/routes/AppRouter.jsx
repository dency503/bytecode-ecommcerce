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
import Page404 from "../views/pages/error/Page404";
import AdminPanel from "../views/admin/AdminPanel";
import GestionarProducto from "../views/admin/GestionarProducto";
import GestionarCategoria from "../views/admin/GestionarCategoria";
import GestionarMarca from "../views/admin/GestionarMarca";
import GestionarEmpleado from "../views/admin/GestionarEmpleado";
import GestionarCargo from "../views/admin/GestionarCargo";
import * as ROUTES from '@/constants/routes';
import GestionarProveedor from "../views/admin/GestionarProveedor";
import GestionarCliente from "../views/admin/GestionarClientes";
import GestionarVenta from "../views/admin/GestionarVenta";

// Import AboutUs if it exists
// import AboutUs from "@/views/AboutUs";

const AppRouter = () => {
  return (
    <>
      <UserCartProvider>
        <Router>
          <Header />
          <Nav />
          <Routes>
            <Route path={ROUTES.HOME} element={<PublicRoute component={Home} />} />
            <Route path={ROUTES.SIGN_UP} element={<PublicRoute component={SignUpForm} />} />
            <Route path={ROUTES.SIGN_IN} element={<PublicRoute component={SignInForm} />} />
            <Route path={ROUTES.ACCOUNT} element={<PrivateRoute component={Account} />} />
            <Route path={ROUTES.BUSQUEDA} element={<BusquedaProducto />} />
            <Route path={ROUTES.VIEW_PRODUCT} element={<ViewProduct />} />
            <Route path={ROUTES.LISTA_CATEGORIA} element={<ListaCategoria />} />
            
            {/* Admin Routes */}
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={<AdminRoute   component={AdminPanel } path={ROUTES.ADMIN_DASHBOARD} />}
            />
            
            <Route
              path={ROUTES.ADMIN_PRODUCTO}
              element={<AdminRoute   path={ROUTES.ADMIN_PRODUCTO} component={GestionarProducto} />}
            />
            <Route
              path={ROUTES.ADMIN_CATEGORIAS}
              element={<AdminRoute  path={ROUTES.ADMIN_CATEGORIAS} component={GestionarCategoria} />}
            />
            <Route
              path={ROUTES.ADMIN_MARCAS}
              element={<AdminRoute  path={ROUTES.ADMIN_MARCAS} component={GestionarMarca} />}
            />
            <Route
              path={ROUTES.ADMIN_EMPLEADOS}
              element={<AdminRoute path={ROUTES.ADMIN_EMPLEADOS} component={GestionarEmpleado} />}
            />
             <Route
              path={ROUTES.ADMIN_CLIENTES}
              element={<AdminRoute path={ROUTES.ADMIN_CLIENTES} component={GestionarCliente} />}
            />
            <Route
              path={ROUTES.ADMIN_CARGOS}
              element={<AdminRoute path={ROUTES.ADMIN_CARGOS} component={GestionarCargo} />}
            />
            <Route
              path={ROUTES.ADMIN_VENTAS}
              element={<AdminRoute path={ROUTES.ADMIN_VENTAS} component={GestionarVenta} />}
            />
            <Route
              path={ROUTES.ADMIN_PROVEEDORES}
              element={<AdminRoute path={ROUTES.ADMIN_PROVEEDORES} component={GestionarProveedor} />}
            />

            <Route path={ROUTES.CHECKOUT} element={<CheckOut />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </Router>
      </UserCartProvider>
    </>
  );
};

export default AppRouter;
