import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import InputField from "../input";

interface CustomFormProps {
  elementInfo: Array<{ label: string; value: string }>;
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
    const initialInputValues = elementInfo.reduce((acc, item) => {
      acc[item.label] = item.value || "";
      return acc;
    }, {} as Record<string, string>);
    setInputValue(initialInputValues);
  }, [elementInfo]);

  useEffect(() => {
    if (isModalClosed) {
      const data = elementInfo.reduce((acc, item) => {
        acc[item.label] = item.value || "";
        return acc;
      }, {} as Record<string, string>);
      onSubmit(data);
    }
  }, [isModalClosed, elementInfo, onSubmit]);

  useEffect(() => {
    if (isModalClosed) {
      onSubmit(inputValue);
    }
  }, [isModalClosed, inputValue, onSubmit]);

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
      {elementInfo.map((item, index) => (
        <div key={index}>
          <InputField
            type="text"
            value={inputValue[item.label] || ""}
            placeholder={item.value || ""}
            label={item.label}
            name={item.label}
            onChange={handleChange}
          />
        </div>
      ))}
    </form>
  );
};

export default CustomForm;
