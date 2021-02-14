import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  validate?: [vld: string, msg: string]
}

const Input: React.FC<InputProps> = ({ label, name, validate, ...rest }: InputProps) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input className={validate?.[0]} type="text" id={name} {...rest} required />
      <span>{validate?.[1]}</span>
    </div>
  );
}

export default Input;