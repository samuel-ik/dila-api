import React from "react";
import style from "app/styles/styles.module.css";

const Navbar = () => {
  return (
    <nav className={`${style.navbar}`}>
      <div className={`${style.navbarContainer} ${style.container}`}>
        <h1 className="text-white text-xl font-bold">Dila App</h1>
        <div>
          <ul className={style.navbarList}>
            <li>
              <a href="/products">Produtos</a>
            </li>
            <li>
              <a href="/sells">Vendas</a>
            </li>
            <li>
              <a href="/shop">Compras</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;