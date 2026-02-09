import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  step?: string;
  helperText?: string;
}

export function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
  error,
  required,
  step,
  helperText
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[13px] font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        className={error ? 'border-red-500' : ''}
        step={step}
      />
      {error && (
        <p className="text-xs text-red-600 font-medium mt-1.5">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}