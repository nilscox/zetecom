import React from 'react';

import './Card.scss';

type CardProps = {
  text: string;
  children: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ text, children, image }) => {
  return (
    <div className="card">

      <div className="card-image">
        <img src={image} alt={text} />
      </div>

      <div className="card-text">
        <strong>{ text }</strong>
      </div>

      <div className="card-subtext">
        { children }
      </div>

    </div>
  );
};

export default Card;
