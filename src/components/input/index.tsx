import React, { ChangeEvent } from "react";
import styles from "./input.module.scss";

interface InputFieldProps {
  value: string;
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
}) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.label}>
        {label && (
          <label htmlFor="input-field">{capitalizeFirstLetter(label)}</label>
        )}
      </div>
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
