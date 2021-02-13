import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface PageHeaderProps {
  title: string;
  isPageRegister?: boolean;
  isPageLogin?: boolean;
}

const Header: React.FC<PageHeaderProps> = ({ title, isPageRegister, isPageLogin }: PageHeaderProps) => {
  const btnRegister = isPageRegister ? null : <Link className="header-buttons" to="/register"><h3>Cadastre-se</h3></Link>
  const btnLogin = isPageLogin ? null : <Link className="header-buttons" to="/login"><h3>Fazer login</h3></Link>

  return (
    <header className="page-header">
      <div className="logo-content">
        <Link className="header-logo" to="/">
          <strong>{title}</strong>
        </Link>
      </div>

      <div className="right-container">
        {btnRegister} {btnLogin}
      </div>
    </header>
  );
};

export default Header;