import React from 'react';

import Flex from 'src/components/Flex';

import './Card.scss';

type CardProps = {
  text: string;
  subtext: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ text, subtext, image }) => {
  return (
    <div className="card">

      <div className="card-image">
        <img src={image} alt={text} />
      </div>

      <div className="card-text">
        <strong>{ text }</strong>
      </div>

      <div className="card-subtext">
        { subtext }
      </div>

    </div>
  );
};

export default Card;
