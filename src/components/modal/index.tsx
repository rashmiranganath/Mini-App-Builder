import styles from "./modal.module.scss";
import CloseIcon from "../../assets/close.svg";

const Modal = ({ setIsOpen, children }) => {
  return (
    <>
      <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Dialog</h5>
          <img
            src={CloseIcon}
            alt="closeIcon"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className={styles.modal}>{children}</div>

        <div className={styles.modalActions}>
          <div className={styles.actionsContainer}>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsOpen(false)}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
