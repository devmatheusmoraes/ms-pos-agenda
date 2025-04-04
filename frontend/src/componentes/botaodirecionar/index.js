import React from 'react';
import { Link } from 'react-router-dom';
import "./botaodirecionar.css"

const BotaoRedirecionar = ( {to, children} ) => {
  return (
    <Link to={to} className='botaodirecionar'>
      <button>{children}</button>
    </Link>
  );
};

export default BotaoRedirecionar;