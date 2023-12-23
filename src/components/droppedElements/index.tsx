import React, { useEffect, useState } from "react";
import styles from "./droppedElements.module.scss";
import MiniAppBuilder from "../../pages/page-builder";
import ReactDOM from "react-dom";

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
  // setDraggedElement: (e: React.DragEvent, item: DroppedElement) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ droppedElements }) => {
  const [containerContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const container = document.getElementById("dynamicElementsContainer");

    const existingNodesMap = new Map();
    Array.from(container?.children || []).forEach((node) => {
      const elementId = (node as HTMLElement).getAttribute("data-element-id");
      existingNodesMap.set(elementId, node);
    });

    droppedElements.forEach((ele) => {
      const elementId = ele.element.id;
      const existingNode = existingNodesMap.get(elementId) as HTMLElement;

      if (existingNode) {
        const { X, Y } = ele.elementdetails;
        existingNode.style.left = `${X}px`;
        existingNode.style.top = `${Y}px`;
      } else {
        const element = createElementComponent(ele);
        element && element.setAttribute("data-element-id", elementId);
        container?.appendChild(element);
      }
    });

    existingNodesMap.forEach((node) => {
      const elementId = (node as HTMLElement).getAttribute("data-element-id");

      if (!droppedElements.some((ele) => ele.element.id === elementId)) {
        (node as HTMLElement).style.display = "none";
      } else {
        (node as HTMLElement).style.display = "block";
      }
    });
  }, [droppedElements]);

  const handleElementClick = (elementId: string, item: DroppedElement) => {
    console.log("Element clicked:", elementId);

    // Add your click handling logic here
  };

  const dragStart = (e: React.DragEvent, item: DroppedElement) => {
    e.dataTransfer.setData("text/plain", item.element.id);
  };

  const createElementComponent = (item: DroppedElement) => {
    const elementStyles = {
      fontSize: `${item.elementdetails["Font Size"]}px`,
      fontWeight: `${item.elementdetails["Font Weight"]}`,
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
        inputElement.addEventListener("click", () =>
          handleElementClick(item.element.id, item)
        );
        inputElement.setAttribute("data-test-id", item.element.id); // Set the id attribute

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
        buttonElement.addEventListener("click", () =>
          handleElementClick(item.element.id, item)
        );
        buttonElement.setAttribute("data-test-id", item.element.id);
        buttonElement.classList.add(styles.focusedElement);
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
        labelElement.addEventListener("dragstart", (event) =>
          dragStart(event, item)
        );
        labelElement.setAttribute("data-test-id", item.element.id);
        labelElement.addEventListener("click", () =>
          handleElementClick(item.element.id, item)
        );
        labelElement.classList.add(styles.focusedLabel);
        labelElement.textContent =
          item.elementdetails.text || item.element.title;
        return labelElement;

      default:
        console.error("Unsupported type: " + item.element.type);
        return null;
    }
  };

  return <div id="dynamicElementsContainer">{containerContent}</div>;
};

export default DropZone;
