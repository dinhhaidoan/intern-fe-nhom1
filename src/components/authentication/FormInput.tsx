import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      
      <div className={type === 'password' ? 'password-input-wrapper' : ''}>
        <input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'error' : ''}`}
          required={required}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      
      {error && (
        <div className="error-message">
          <FiAlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;