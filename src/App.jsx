import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "font-awesome/css/font-awesome.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home/Home";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import Footer from "./components/common/Footer";
import UserProfile from "./views/account/Account";
import SignInForm from "./views/auth/signin/Sigin";
import ViewProduct from "./views/view_product/ViewProduct";
import { UserCartProvider } from "./hooks/UserCartProvider";
import CheckOut from "./views/checkout/CheckOut";
function App() {
  return (
    <><UserCartProvider>
      <Router>
        <Header />
        <Nav />
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/cuenta" element={<UserProfile />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/products/:id" element={<ViewProduct />} />
            <Route path="/checkout" element={<CheckOut />} />
        </Routes>
        <Footer />
      </Router></UserCartProvider>
    </>
  );
}

export default App;
