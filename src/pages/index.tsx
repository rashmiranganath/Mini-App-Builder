import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./sidebar";
import MiniAppBuilder from "./page-builder";
import styles from "./homepage.module.scss";

interface Element {
  id?: string;
  type: string;
  title: string;
  name: string;
}

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [elements] = useState<Element[]>([
    {
      type: "input",
      title: "Please enter the input",
      name: "Input",
    },
    {
      type: "button",
      title: "Button",
      name: "Button",
    },
    {
      type: "label",
      title: "This is a label",
      name: "Label",
    },
  ]);

  const [draggedElement, setDraggedElement] = useState<Partial<Element>>({});

  const handleDraggedElement = (item: Element) => {
    // const newElement: Element = {
    //   id: uuidv4(),
    //   type: item.type,
    //   title: item.title,
    //   name: item.name,
    // };
    setDraggedElement(item);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <MiniAppBuilder isdraggedElement={draggedElement as Element} />
        </div>
        <div className={styles.rightContainer}>
          <Sidebar menu={elements} setDraggedElement={handleDraggedElement} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
