import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import MenuIcon from "../../assets/gripvertical.svg";

const Sidebar = ({ menu, setDraggedElement }) => {
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", "");
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
