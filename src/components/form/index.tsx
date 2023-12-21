import React, { useState, useEffect } from "react";
import InputField from "../input";

const CustomForm = ({ elementInfo, onSubmit, isModalClosed }) => {
  const [inputValue, setInputValue] = useState({});
  useEffect(() => {
    const initialInputValues = elementInfo.reduce((acc, item) => {
      acc[item.label] = item.value || "";
      return acc;
    }, {});
    setInputValue(initialInputValues);
  }, [elementInfo]);

  useEffect(() => {
    if (isModalClosed) {
      console.log("kkskks");
      onSubmit(elementInfo);
    }
  }, [isModalClosed]);

  useEffect(() => {
    if (isModalClosed) {
      onSubmit(inputValue);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    const { name, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("handle submit");
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
