import React from 'react';

import './Card.scss';

type CardProps = {
  primary: string;
  children: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ primary, children, image }) => {
  return (
    <div className="card">

      <div className="card-image">
        <img src={image} alt={primary} />
      </div>

      <div className="card-primary">
        <strong>{ primary }</strong>
      </div>

      <div className="card-secondary">
        { children }
      </div>

    </div>
  );
};

export default Card;
