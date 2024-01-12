import React from 'react';
import './css/ContainerCard.css';

const ContainerCard = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
}

export default ContainerCard;