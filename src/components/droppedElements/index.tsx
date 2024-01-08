import React from "react";
import styles from "./droppedElements.module.scss";
import { createDomElement } from "../../utils";

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
  droppedElements: DroppedElement;
  selectedElement: (e: React.KeyboardEvent, id: string, ele: any) => void;
}
interface DroppedElement {
  element: {
    id: string;
    type: string;
    title: string;
    name: string;
  };
  elementdetails: ElementDetails;
}

const DropZone: React.FC<DropZoneProps> = ({
  droppedElements,
  selectedElement,
}) => {
  const handleElementClick = (
    e: React.KeyboardEvent,
    elementId: string,
    ele
  ) => {
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
    const container = document.getElementById("dynamicElementsContainer");
    const element = createDomElement(
      item,
      dragStart,
      styles,
      handleElementClick
    );
    const elementId = item.element.id;
    const existingNode = document.getElementById(elementId);
    if (existingNode?.parentNode) {
      existingNode?.parentNode.replaceChild(element, existingNode);
    } else {
      container?.appendChild(element);
    }
  };

  return (
    <>
      {droppedElements.length &&
        droppedElements.map((item) => {
          <div key={item.element.id}>{createElementComponent(item)}</div>;
        })}
    </>
  );
};

export default DropZone;
