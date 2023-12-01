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
            <Route
              path={"/"}
              element={<PublicRoute component={Home} path={"/"} />}
            />
            {/*<Route path="/" element={<Home />} />*/}
            <Route path="/cuenta" element={<Account />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/busqueda/:termino" element={<BusquedaProducto />} />

            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/products/:id" element={<ViewProduct />} />
            <Route
              path="/categoria/:categoriaId"
              element={<ListaCategoria />}
            />
            <Route path="/checkout" element={<CheckOut />} />
            {/*<Route path="/about" element={<AboutUs />} />*/}
          </Routes>
          <Footer />
        </Router>
      </UserCartProvider>
    </>
  );
};

export default AppRouter;
