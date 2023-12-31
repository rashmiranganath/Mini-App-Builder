import React, { useState, useEffect } from "react";
import styles from "./droppedElements.module.scss";

interface ElementDetails {
  [key: string]: string;
}

interface Element {
  id: string;
  type: string;
  title: string;
  name: string;
}

interface DroppedElement {
  element: Element;
  elementdetails: ElementDetails;
}

interface DropZoneProps {
  droppedElements: DroppedElement[];
  selectedElement: (e: React.KeyboardEvent, id: string, ele: any) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  droppedElements,
  selectedElement,
}) => {
  // const [labelFocused, setLabeFocused] = useState(false);
  useEffect(() => {
    const container = document.getElementById("dynamicElementsContainer");

    droppedElements.length &&
      droppedElements.forEach((ele) => {
        const elementId = ele.element.id;
        const existingNode = document.getElementById(elementId);
        if (existingNode?.parentNode) {
          existingNode?.parentNode.removeChild(existingNode);
        }
        const element = createElementComponent(ele);
        element && element.setAttribute("id", elementId);
        container?.appendChild(element);
      });
  }, [droppedElements]);

  const handleElementClick = (e, elementId: string, ele) => {
    if (e.keyCode === 46) {
      selectedElement(e, elementId, ele);
      const existingNode = document.getElementById(elementId);
      if (existingNode?.parentNode) {
        existingNode?.parentNode.removeChild(existingNode);
      }
    }
    selectedElement(e, elementId, ele);
  };

  const dragStart = (e: React.DragEvent, item: DroppedElement) => {
    e.dataTransfer.setData("text/plain", item.element.id);
  };

  const createElementComponent = (item: DroppedElement) => {
    const elementStyles = {
      "font-size": `${item.elementdetails["Font size"]}px`,
      "font-weight": `${item.elementdetails["Font Weight"]}`,
      position: "absolute",
      left: `${item.elementdetails.X}px`,
      top: `${item.elementdetails.Y}px`,
      cursor: "pointer",
    };

    switch (item.element.type) {
      case "input":
        const inputElement = document.createElement("input");
        inputElement.setAttribute("draggable", "true");
        inputElement.setAttribute(
          "style",
          Object.entries(elementStyles)
            .map(([key, value]) => `${key}:${value}`)
            .join(";")
        );
        inputElement.value = item.elementdetails.text || item.element.title;
        inputElement.addEventListener("dragstart", (event) =>
          dragStart(event, item)
        );
        inputElement.addEventListener("keypress", (e) => {
          handleElementClick(e, item.element.id, item);
        });
        inputElement.addEventListener("keyup", (e) => {
          handleElementClick(e, item.element.id, item);
        });
        inputElement.setAttribute("id", item.element.id);
        inputElement.classList.add(styles.focusedElement);
        return inputElement;

      case "button":
        const buttonElement = document.createElement("button");
        buttonElement.setAttribute("draggable", "true");
        buttonElement.setAttribute(
          "style",
          Object.entries(elementStyles)
            .map(([key, value]) => `${key}:${value}`)
            .join(";")
        );
        buttonElement.addEventListener("dragstart", (event) =>
          dragStart(event, item)
        );
        buttonElement.addEventListener("keypress", (e) => {
          handleElementClick(e, item.element.id, item);
        });
        buttonElement.addEventListener("keyup", (e) => {
          handleElementClick(e, item.element.id, item);
        });
        buttonElement.setAttribute("id", item.element.id);
        buttonElement.classList.add(styles.buttonElement);
        buttonElement.textContent =
          item.elementdetails.text || item.element.title;
        return buttonElement;

      case "label":
        const labelElement = document.createElement("label");
        labelElement.setAttribute("draggable", "true");
        labelElement.setAttribute(
          "style",
          Object.entries(elementStyles)
            .map(([key, value]) => `${key}:${value}`)
            .join(";")
        );
        labelElement.setAttribute("tabindex", "0");
        labelElement.addEventListener("dragstart", (event) =>
          dragStart(event, item)
        );
        labelElement.setAttribute("id", item.element.id);
        const interactiveElement = document.createElement("input");
        interactiveElement.type = "text";
        interactiveElement.addEventListener("keypress", (e) => {
          handleElementClick(e, item.element.id, item);
        });
        labelElement.addEventListener("keypress", (e) => {
          handleElementClick(e, item.element.id, item);
        });

        labelElement.addEventListener("keyup", (e) => {
          handleElementClick(e, item.element.id, item);
        });
        labelElement.classList.add(styles.label);
        labelElement.textContent =
          item.elementdetails.text || item.element.title;
        return labelElement;
      default:
        console.error("Unsupported type: " + item.element.type);
        return null;
    }
  };

  return;
};

export default DropZone;
