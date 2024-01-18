import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import InputField from "../input";

// interface ElementDetails {
//   text: string;
//   X: string | number;
//   Y: string | number;
//   "Font size": string;
//   "Font Weight": string;
// }
interface ElementDetails {
  [key: string]: string;
}
interface CustomFormProps {
  elementInfo: ElementDetails;
  onSubmit: (data: ElementDetails) => void;
  isModalClosed: boolean;
}

const CustomForm: React.FC<CustomFormProps> = ({
  elementInfo,
  onSubmit,
  isModalClosed,
}) => {
  const [inputValue, setInputValue] = useState<ElementDetails>({
    text: "",
    X: "",
    Y: "",
    "Font size": "",
    "Font Weight": "",
  });

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
      {Object.entries(elementInfo).map(([label], index) => (
        <div key={index}>
          <InputField
            type="text"
            value={inputValue[label]}
            placeholder={inputValue[label]}
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
