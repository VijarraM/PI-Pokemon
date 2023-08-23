import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>Mi Sitio</div>
      <ul className={styles.navbarLinks}>
        <li>
          <Link to='/'>Inicio</Link>
        </li>
        <li>
          <Link to='/home'>Home</Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
