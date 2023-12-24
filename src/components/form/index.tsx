import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import InputField from "../input";

interface CustomFormProps {
  elementInfo: Record<string, string>;
  onSubmit: (data: Record<string, string>) => void;
  isModalClosed: boolean;
}

const CustomForm: React.FC<CustomFormProps> = ({
  elementInfo,
  onSubmit,
  isModalClosed,
}) => {
  const [inputValue, setInputValue] = useState<Record<string, string>>({});

  useEffect(() => {
    setInputValue(elementInfo);
  }, [elementInfo]);

  useEffect(() => {
    if (isModalClosed) {
      onSubmit(inputValue);
    }
  }, [isModalClosed, inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(elementInfo).map(([label, defaultValue], index) => (
        <div key={index}>
          <InputField
            type="text"
            value={inputValue[label] || defaultValue}
            placeholder={inputValue[label] || defaultValue}
            label={label}
            name={label}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
};

export default CustomForm;
