import React, { useState, useRef, useEffect } from 'react';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ 
  length, 
  onComplete, 
  onChange, 
  error 
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange?.(otpString);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (otpString.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const newOtp = Array(length).fill('');
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    const otpString = newOtp.join('');
    onChange?.(otpString);
    
    if (otpString.length === length) {
      onComplete(otpString);
    } else if (pastedData.length < length) {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  return (
    <div>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className={`otp-input ${digit ? 'filled' : ''} ${error ? 'error' : ''}`}
          />
        ))}
      </div>
      {error && (
        <div className="error-message" style={{ textAlign: 'center' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default OTPInput;