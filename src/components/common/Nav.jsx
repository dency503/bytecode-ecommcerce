import React from 'react'


const Nav = () => {
  return (
    <nav id="navigation">
    <div className="container">
        <div id="responsive-nav">
            <ul className=" main-nav nav  d-flex">
                <li className="active"><a href="#">Home</a></li>
                <li><a href="#">Ofertas</a></li>
                <li><a href="#">Categorias</a></li>
                <li><a href="#">Laptops</a></li>
                <li><a href="#">Telefonos</a></li>
                <li><a href="#">Camaras</a></li>
                <li><a href="#">Accesorios</a></li>
            </ul>
        </div>
    </div>
</nav>
  )
}

export default Nav