import React from 'react';

import './styles.css';

interface Props {
  name: string;
  email: string;
}

const CardUser: React.FC<Props> = ({ name, email }: Props) => {
  return (
    <div className="container-card">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

export default CardUser;