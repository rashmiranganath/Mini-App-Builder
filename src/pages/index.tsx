import Sidebar from "./sidebar";
import MiniAppBuilder from "./page-builder";
import styles from "./homepage.module.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 from uuid library

const HomePage = () => {
  const [elements, setElements] = useState([
    {
      id: uuidv4(),
      type: "input",
      title: "Please enter the input",
      name: "Input",
    },
    {
      id: uuidv4(),
      type: "button",
      title: "button",
      name: "Button",
    },
    {
      id: uuidv4(),
      type: "label",
      title: "label",
      name: "Label",
    },
  ]);
  const [draggedElement, setDraggedElement] = useState({});
  const [droppedElements, setDroppedElements] = useState([]);

  const handleDraggedElement = (item) => {
    setDraggedElement(item);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <MiniAppBuilder isdraggedElement={draggedElement} />
        </div>
        <div className={styles.rightContainer}>
          <Sidebar menu={elements} setDraggedElement={handleDraggedElement} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
