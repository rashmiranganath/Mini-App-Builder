export const createDomElement = (
  item,
  dragStart,
  styles,
  handleElementClick
) => {
  const elementStyles = {
    "font-size": `${item.elementdetails["Font size"]}px`,
    "font-weight": `${item.elementdetails["Font Weight"]}`,
    position: "absolute",
    left: `${item.elementdetails.X}px`,
    top: `${item.elementdetails.Y}px`,
    cursor: "pointer",
  };
  const elementType = item.element.type;
  const domElement = document.createElement(elementType);
  domElement.setAttribute("draggable", "true");
  domElement.setAttribute(
    "style",
    Object.entries(elementStyles)
      .map(([key, value]) => `${key}:${value}`)
      .join(";")
  );
  domElement.addEventListener(
    "dragstart",
    (e: React.ChangeEvent<HTMLInputElement>) => dragStart(e, item)
  );
  domElement.addEventListener(
    "keypress",
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleElementClick(e, item.element.id, item);
    }
  );
  domElement.addEventListener(
    "keyup",
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleElementClick(e, item.element.id, item);
    }
  );
  domElement.setAttribute("id", item.element.id);
  if (item.element.type === "input") {
    domElement.value = item.elementdetails.text || item.element.title;
    domElement.classList.add(styles.focusedElement);
  } else if (item.element.type === "button") {
    domElement.textContent = item.elementdetails.text || item.element.title;
    domElement.classList.add(styles.buttonElement);
  } else if (item.element.type === "label") {
    domElement.textContent = item.elementdetails.text || item.element.title;
    domElement.classList.add(styles.label);
    domElement.setAttribute("tabindex", "0");
    const interactiveElement = document.createElement("input");
    interactiveElement.type = "text";
    interactiveElement.addEventListener("keypress", (e) => {
      handleElementClick(e, item.element.id, item);
    });
  }

  return domElement;
};
