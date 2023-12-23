import React, { useEffect, useState, DragEvent } from "react";
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

const MiniAppBuilder: React.FC<MiniAppBuilderProps> = ({
  isdraggedElement,
}) => {
  const [droppedElements, setDroppedElements] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [elementInfo, setElementInfo] = useState<
    Array<{ label: string; value: string }>
  >([
    { label: "text", value: "" },
    { label: "X", value: "" },
    { label: "Y", value: "" },
    { label: "Font size", value: "" },
    { label: "Font Weight", value: "" },
  ]);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const draggedElementId = e.dataTransfer.getData("text/plain");
    console.log(draggedElementId);

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
                  X: mouseX,
                  Y: mouseY,
                },
              }
            : item
        );

        setDroppedElements(updatedElements);
      } else {
        setElementInfo((prevState) => [
          ...prevState.map((item) => {
            if (item.label === "X") {
              return { ...item, value: mouseX };
            } else if (item.label === "Y") {
              return { ...item, value: mouseY };
            } else {
              return item;
            }
          }),
        ]);

        setIsOpen(true);
      }
    }
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (values: any) => {
    console.log(values, "values");
    setDroppedElements((prev) => {
      const indexToUpdate = prev.findIndex(
        (el) => el.element.id === isdraggedElement.id
      );

      if (indexToUpdate !== -1) {
        const updatedElements = [...prev];
        updatedElements[indexToUpdate] = {
          ...updatedElements[indexToUpdate],
          elementdetails: values,
        };
        return updatedElements;
      } else {
        return [...prev, { element: isdraggedElement, elementdetails: values }];
      }
    });
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
          <DropZone droppedElements={droppedElements} />
        )}
      </div>
    </>
  );
};

export default MiniAppBuilder;
