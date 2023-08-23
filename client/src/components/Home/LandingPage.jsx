import React from 'react';
import { btn } from './Home.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Link to='/home'>
      <div className={btn}>Ir a Home</div>;
    </Link>
  );
};

export default LandingPage;
