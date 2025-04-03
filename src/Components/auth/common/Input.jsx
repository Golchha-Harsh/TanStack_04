import React from 'react';
import './Input.css';
function Input({ label, id, type, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;