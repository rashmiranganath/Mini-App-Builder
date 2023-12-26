import React, { useState, DragEvent, useEffect } from "react";
import styles from "./miniAppbuilder.module.scss";
import Modal from "../../components/modal";
import CustomForm from "../../components/form";
import DropZone from "../../components/droppedElements";

interface MiniAppBuilderProps {
  isdraggedElement: {
    id?: string;
    type: string;
    title: string;
    name: string;
  };
}

interface ElementDetails {
  text: string;
  X: string;
  Y: string;
  "Font size": string;
  "Font Weight": string;
}

const MiniAppBuilder: React.FC<MiniAppBuilderProps> = ({
  isdraggedElement,
}) => {
  const [droppedElements, setDroppedElements] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [elementInfo, setElementInfo] = useState<ElementDetails>({
    text: "",
    X: "",
    Y: "",
    "Font size": "",
    "Font Weight": "",
  });
  const [ele, setEle] = useState({});

  useEffect(() => {
    setEle(isdraggedElement);
    if (isdraggedElement && isdraggedElement.title) {
      setElementInfo((prevElementInfo) => ({
        ...prevElementInfo,
        text: isdraggedElement.title,
      }));
    }
  }, [isdraggedElement]);

  useEffect(() => {
    localStorage.setItem("droppedElements", JSON.stringify(droppedElements));
  }, [droppedElements]);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text/plain");
    if (draggedElementId) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const existingElement = droppedElements.find(
        (el) => el.element.id === draggedElementId
      );

      if (existingElement) {
        const updatedElements = droppedElements.map((item) =>
          item.element.id === draggedElementId
            ? {
                ...item,
                elementdetails: {
                  ...item.elementdetails,
                  X: mouseX.toString(),
                  Y: mouseY.toString(),
                },
              }
            : item
        );

        setDroppedElements(updatedElements);
      } else {
        setElementInfo((prevElementInfo) => ({
          ...prevElementInfo,
          text: "",
          X: mouseX.toString(),
          Y: mouseY.toString(),
          "Font size": "",
          "Font Weight": "",
        }));

        setIsOpen(true);
      }
    }
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (values: any) => {
    setDroppedElements((prev) => {
      const indexToUpdate = prev.findIndex((el) => el.element.id === ele?.id);
      if (indexToUpdate !== -1) {
        const updatedElements = [...prev];
        updatedElements[indexToUpdate] = {
          ...updatedElements[indexToUpdate],
          elementdetails: values,
        };
        return updatedElements;
      } else {
        return [...prev, { element: ele, elementdetails: values }];
      }
    });
  };

  const handleSelectedElement = (e, id: any, selectedElement) => {
    if (e.key === "Enter") {
      setEle(selectedElement.element);
      setElementInfo(selectedElement.elementdetails);
      setIsOpen(true);
    } else if (e.key === "Delete" || e.keyCode === 46) {
      const filteredElements = droppedElements.filter(
        (ele) => ele.element.id !== id
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
