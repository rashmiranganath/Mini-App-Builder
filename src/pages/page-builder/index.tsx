import React, { useState, DragEvent, useEffect } from "react";
import styles from "./miniAppbuilder.module.scss";
import Modal from "../../components/modal";
import CustomForm from "../../components/form";
import DropZone from "../../components/droppedElements";
import { v4 as uuidv4 } from "uuid";

interface MiniAppBuilderProps {
  isdraggedElement: {
    id?: string;
    type: string;
    title: string;
    name: string;
  };
}

interface Element {
  id: string;
  type: string;
  title: string;
  name: string;
}
interface ElementDetails {
  [key: string]: string;
}
// interface ElementDetails {
//   text: string;
//   X: string | number;
//   Y: string | number;
//   "Font size": string;
//   "Font Weight": string;
// }
interface DroppedElement {
  element?: Element;
  elementdetails?: ElementDetails;
}

// interface DroppedElement {
//   element: {
//     id?: string;
//     type: string;
//     title: string;
//     name: string;
//   };
//   elementdetails: ElementDetails;
// }

const MiniAppBuilder: React.FC<MiniAppBuilderProps> = ({
  isdraggedElement,
}) => {
  const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [elementInfo, setElementInfo] = useState<ElementDetails>({
    text: "",
    X: "",
    Y: "",
    "Font size": "",
    "Font Weight": "",
  });
  const [draggedElement, setDraggedElement] = useState<
    MiniAppBuilderProps["isdraggedElement"]
  >({
    id: "",
    type: "",
    title: "",
    name: "",
  });

  useEffect(() => {
    setDraggedElement(isdraggedElement);
  }, [isdraggedElement]);

  useEffect(() => {
    localStorage.setItem("droppedElements", JSON.stringify(droppedElements));
  }, [droppedElements]);

  const updateExistingElement = (
    mouseX: string,
    mouseY: string,
    draggedElementId: string
  ) => {
    const updatedElements = droppedElements.map((item) =>
      item?.element?.id === draggedElementId
        ? {
            ...item,
            elementdetails: {
              ...item?.elementdetails,
              X: mouseX.toString(),
              Y: mouseY.toString(),
            },
          }
        : item
    );

    setDroppedElements(updatedElements);
  };
  const addNewElement = (mouseX: string, mouseY: string) => {
    setElementInfo((prevElementInfo) => ({
      ...prevElementInfo,
      text: draggedElement?.title,
      X: mouseX,
      Y: mouseY,
      "Font size": "",
      "Font Weight": "",
    }));

    setIsOpen(true);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text/plain");
    const mouseX = e.clientX.toString();
    const mouseY = e.clientY.toString();
    if (draggedElementId !== "undefined") {
      const existingElement = droppedElements.find(
        (el) => el?.element?.id === draggedElementId
      );
      if (existingElement) {
        updateExistingElement(mouseX, mouseY, draggedElementId);
      }
    } else {
      setDraggedElement({ ...draggedElement, id: uuidv4() });
      if (draggedElement) {
        e.dataTransfer.setData("text/plain", draggedElement?.id);
      }
      addNewElement(mouseX, mouseY);
    }
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (values: ElementDetails) => {
    setDroppedElements((prev) => {
      const indexToUpdate = prev.findIndex(
        (element) => element?.element?.id === draggedElement?.id
      );
      if (indexToUpdate !== -1) {
        const updatedElements = [...prev];
        updatedElements[indexToUpdate] = {
          ...updatedElements[indexToUpdate],
          elementdetails: values,
        };
        return updatedElements;
      } else {
        return [...prev, { element: draggedElement, elementdetails: values }];
      }
    });
  };

  const handleSelectedElement = (
    e: React.KeyboardEvent,
    id: string,
    selectedElement: DroppedElement
  ) => {
    if (e.key === "Enter") {
      setDraggedElement(selectedElement?.element);
      setElementInfo(
        selectedElement.elementdetails || {
          text: "",
          X: "",
          Y: "",
          "Font size": "",
          "Font Weight": "",
        }
      );
      setIsOpen(true);
    } else if (e.key === "Delete" || e.keyCode === 46) {
      const filteredElements = droppedElements.filter(
        (ele) => ele?.element?.id !== id
      );
      setDroppedElements(filteredElements);
    }
  };

  return (
    <>
      <div
        className={styles.pageBuilderContainer}
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event)}
        id="dynamicElementsContainer"
      >
        {isOpen && (
          <Modal setIsOpen={setIsOpen}>
            <CustomForm
              elementInfo={elementInfo}
              onSubmit={handleSubmit}
              isModalClosed={isOpen}
            />
          </Modal>
        )}
        {!isOpen && droppedElements.length > 0 && (
          <DropZone
            droppedElements={droppedElements}
            selectedElement={handleSelectedElement}
          />
        )}
      </div>
    </>
  );
};

export default MiniAppBuilder;
