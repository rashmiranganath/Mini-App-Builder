import React from "react";
import styles from "./sidebar.module.scss";
import MenuIcon from "../../assets/gripvertical.svg";

interface SidebarProps {
  menu: {
    id?: string;
    type: string;
    title: string;
    name: string;
  }[];
  setDraggedElement: (item: {
    id: string;
    type: string;
    title: string;
    name: string;
  }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menu, setDraggedElement }) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    e.dataTransfer.setData("text/plain", item.id);
    setDraggedElement(item);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>BLOCKS</h1>
      {menu.map((item) => (
        <div
          key={item.title}
          draggable
          onDragStart={(event) => onDragStart(event, item)}
          className={styles.listItem}
        >
          <img src={MenuIcon} alt="menuIcon" />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
