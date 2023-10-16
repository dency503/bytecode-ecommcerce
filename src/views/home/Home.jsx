import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import CategoriaProducto from '../../components/common/CategoriaProducto';
import ProductoLista from '../../components/common/ProductoLista';
import HotDeal from '../../components/common/HotDeal';
import Newsletter from '../../components/common/Newsletter';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle("Inicio | Bytecode")
  return (
    
    <div><CategoriaProducto/>
    <ProductoLista/>
    <HotDeal/>
    <Newsletter/>
    </div>
  )
}

export default Home