import { useState } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (name: string, value: string): boolean => {
    const fieldRules = rules[name];
    if (!fieldRules) return true;

    for (const rule of fieldRules) {
      if (rule.required && !value.trim()) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: rule.message || `${name} là bắt buộc` 
        }));
        return false;
      }

      if (!value.trim() && !rule.required) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
        continue;
      }

      if (rule.minLength && value.length < rule.minLength) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: rule.message || `${name} phải có ít nhất ${rule.minLength} ký tự` 
        }));
        return false;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: rule.message || `${name} không được vượt quá ${rule.maxLength} ký tự` 
        }));
        return false;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: rule.message || `${name} không đúng định dạng` 
        }));
        return false;
      }

      if (rule.custom && !rule.custom(value)) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: rule.message || `${name} không hợp lệ` 
        }));
        return false;
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    
    return true;
  };

  const validateAll = (formData: { [key: string]: string }): boolean => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    Object.keys(rules).forEach(fieldName => {
      const value = formData[fieldName] || '';
      const fieldRules = rules[fieldName];

      for (const rule of fieldRules) {
        if (rule.required && !value.trim()) {
          newErrors[fieldName] = rule.message || `${fieldName} là bắt buộc`;
          isValid = false;
          break;
        }

        if (!value.trim() && !rule.required) continue;

        if (rule.minLength && value.length < rule.minLength) {
          newErrors[fieldName] = rule.message || `${fieldName} phải có ít nhất ${rule.minLength} ký tự`;
          isValid = false;
          break;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          newErrors[fieldName] = rule.message || `${fieldName} không được vượt quá ${rule.maxLength} ký tự`;
          isValid = false;
          break;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          newErrors[fieldName] = rule.message || `${fieldName} không đúng định dạng`;
          isValid = false;
          break;
        }

        if (rule.custom && !rule.custom(value)) {
          newErrors[fieldName] = rule.message || `${fieldName} không hợp lệ`;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validate,
    validateAll,
    clearErrors,
    clearError
  };
};

export const ValidationRules = {
  required: (message?: string): ValidationRule => ({
    required: true,
    message: message || 'Trường này là bắt buộc'
  }),

  email: (message?: string): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: message || 'Email không đúng định dạng'
  }),

  minLength: (length: number, message?: string): ValidationRule => ({
    minLength: length,
    message: message || `Phải có ít nhất ${length} ký tự`
  }),

  maxLength: (length: number, message?: string): ValidationRule => ({
    maxLength: length,
    message: message || `Không được vượt quá ${length} ký tự`
  }),

  password: (message?: string): ValidationRule => ({
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: message || 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
  }),

  confirmPassword: (passwordValue: string, message?: string): ValidationRule => ({
    custom: (value: string) => value === passwordValue,
    message: message || 'Xác nhận mật khẩu không khớp'
  }),

  name: (message?: string): ValidationRule => ({
    pattern: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÁÀẢẠÂẤẦẨẬÃÈÉÊẾỀỂỄẸÌÍÎÏĨÒÓÔỐỒỔỖỌÕÙÚŨỤÝỲỸỶỴĐƯửỮỰỪỬưở]+$/,
    message: message || 'Tên chỉ được chứa chữ cái'
  }),

  otp: (length: number = 6, message?: string): ValidationRule => ({
    pattern: new RegExp(`^\\d{${length}}$`),
    message: message || `Mã OTP phải có ${length} chữ số`
  })
};