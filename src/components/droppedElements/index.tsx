import React, { ReactNode } from "react";
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
  element?: Element;
  elementdetails?: ElementDetails;
}

interface DropZoneProps {
  droppedElements: DroppedElement[];
  selectedElement: (
    e: React.KeyboardEvent,
    id: string,
    ele: DroppedElement
  ) => void;
}
// interface DroppedElement {
//   element?: {
//     id: string;
//     type: string;
//     title: string;
//     name: string;
//   };
//   elementdetails?: ElementDetails;
// }

const DropZone: React.FC<DropZoneProps> = ({
  droppedElements,
  selectedElement,
}) => {
  const handleElementClick = (
    e: React.KeyboardEvent,
    elementId: string,
    ele: DroppedElement
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
    const itemId = item?.element?.id;
    if (itemId) {
      e.dataTransfer.setData("text/plain", itemId);
    }
  };

  const createElementComponent = (item: DroppedElement) => {
    const container = document.getElementById("dynamicElementsContainer");
    const element = createDomElement(
      item,
      dragStart,
      styles,
      handleElementClick
    );
    const elementId = item?.element?.id;
    if (elementId) {
      const existingNode = document.getElementById(elementId);
      if (existingNode?.parentNode) {
        existingNode?.parentNode.replaceChild(element, existingNode);
      } else {
        container?.appendChild(element);
      }
    }
  };

  return (
    <>
      {droppedElements &&
        droppedElements?.map((item: DroppedElement) => {
          <div key={item?.element?.id}>
            {createElementComponent(item) as ReactNode}
          </div>;
        })}
    </>
  );
};

export default DropZone;
