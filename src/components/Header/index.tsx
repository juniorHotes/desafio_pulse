import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Logo from '../../assets/images/logo_mateus.png'

interface PageHeaderProps {
  title: string;
  btnRegister?: boolean;
  btnLogin?: boolean;
  btnLogout?: boolean;
  logout?: any;
}

const Header: React.FC<PageHeaderProps> = ({ title, btnRegister, btnLogin, btnLogout, logout }: PageHeaderProps) => {

  const _register = btnRegister ? <Link className="header-buttons" to="/register">Criar conta</Link> : false
  const _login = btnLogin ? <Link className="header-buttons" to="/login">Entrar</Link> : false
  const _logout = btnLogout ? <Link onClick={logout} className="header-buttons" to="#">Sair</Link> : false

  return (
    <header className="page-header" >
      <div className="logo-content">
        <Link className="header-logo" to="/">
          <img width="120px" src={Logo} alt="Logo" title="Logo Grupo Mateus" />
        </Link>
      </div>

      <div className="right-container">
        {_register} {_login} {_logout}
      </div>
    </header>
  );
};

export default Header;