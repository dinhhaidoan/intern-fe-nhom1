import type { ButtonHTMLAttributes, InputHTMLAttributes, PropsWithChildren, SelectHTMLAttributes } from "react";
import React from "react";

type ButtonVariant = "default" | "primary" | "danger";

export const Button: React.FC<
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }>
> = ({ variant = "default", className = "", children, ...rest }) => {
  const base = "btn";
  const cls =
    variant === "primary" ? `${base} btn-primary` :
    variant === "danger"  ? `${base} btn-danger`  : base;
  return (
    <button className={`${cls} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ className = "", ...rest }) => {
  return <input className={`border p-2 rounded ${className}`} {...rest} />;
};

export const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ className = "", children, ...rest }) => {
  return <select className={`border p-2 rounded ${className}`} {...rest}>{children}</select>;
};
