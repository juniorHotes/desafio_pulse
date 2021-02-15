import React from 'react';

import './styles.css';
import logo from '../../assets/images/logo_pulse.png'

interface Props {
  name: string;
  email: string;
}

const CardUser: React.FC<Props> = ({ name, email }: Props) => {
  return (
    <div className="container-card" >
      <img width="100%" src={logo} alt="Logo Pulse" title="Pulse" />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default CardUser;