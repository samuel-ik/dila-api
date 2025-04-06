import React from "react";
import style from "app/styles/styles.module.css";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.container}>
        <h1 className="text-white text-xl font-bold">Dila App</h1>
      </div>
    </nav>
  );
};

export default Navbar;