import React, { useEffect } from "react";

const DropZone = ({ droppedElements }) => {
  const createElements = (item) => {
    console.log(item, "drop");
    const container = document.getElementById("dynamicElementsContainer");
    let element;
    switch (item.element.type) {
      case "input":
        element = document.createElement("input");
        element.setAttribute(
          "placeholder",
          item.elementdetails.text || item.element.title
        );
        break;
      case "button":
        element = document.createElement("button");
        element.innerText = item.elementdetails.text || item.element.title;
        break;
      case "label":
        element = document.createElement("label");
        element.innerText = item.elementdetails.text || item.element.title;
        break;
      default:
        console.error("Unsupported type: " + item.element.type);
        return;
    }
    element.style.position = "absolute";
    element.style.left = `${item.elementdetails.X}px`;

    element.style.top = `${item.elementdetails.Y}px`;

    container && container.appendChild(element);
  };
  useEffect(() => {
    console.log(droppedElements, "droppedElements");
    droppedElements.forEach((dropped) => {
      return createElements(dropped);
    });
  }, [droppedElements]);

  return (
    <div>
      <h2>Dropped Elements</h2>
    </div>
  );
};

export default DropZone;
