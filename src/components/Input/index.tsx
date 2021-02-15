import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType: string;
  label: string;
  name: string;
  validate?: [vld: string, msg: string]
}

const Input: React.FC<InputProps> = ({ inputType, label, name, validate, ...rest }: InputProps) => {

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input className={validate?.[0]} type={inputType} id={name} {...rest} required />
      <span>{validate?.[1]}</span>
    </div>
  );
}

export default Input;