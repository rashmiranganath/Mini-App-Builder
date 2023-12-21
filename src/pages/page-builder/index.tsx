import React, { useEffect, useState } from "react";
import styles from "./miniAppbuilder.module.scss";
import Modal from "../../components/modal";
import CustomForm from "../../components/form";
import DropZone from "../../components/droppedElements";

const MiniAppBuilder = ({ isdraggedElement }) => {
  const [draggedElement, setDraggedElement] = useState({});
  const [droppedElements, setDroppedElements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [elementInfo, setElementInfo] = useState([
    { label: "text", value: "" },
    { label: "X", value: "" },
    { label: "Y", value: "" },
    { label: "Font size", value: "" },
    { label: "Font Weight", value: "" },
  ]);

  const onDrop = (e) => {
    e.preventDefault();
    setIsOpen(true);
    const mouseX = e.clientX;
    const mouseY = e.clientY;
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
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (values) => {
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

    setDraggedElement({});
  };

  useEffect(() => {
    setDraggedElement(isdraggedElement);
  }, [isdraggedElement]);
  return (
    <>
      <div
        className={styles.pageBuilderContainer}
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event)}
        id="dynamicElementsContainer"
      >
        {isOpen ? (
          <Modal setIsOpen={setIsOpen}>
            <CustomForm
              elementInfo={elementInfo}
              onSubmit={handleSubmit}
              isModalClosed={isOpen}
            />
          </Modal>
        ) : (
          droppedElements.length > 0 && (
            <DropZone droppedElements={droppedElements} />
          )
        )}
      </div>
    </>
  );
};

export default MiniAppBuilder;
