import "./styles.css";
import { createPortal } from "react-dom";

const modalContainer = document.getElementById("modalContainer") as HTMLElement;

function Modal({ children }) {
  return createPortal(<div className="Modal">{children}</div>, modalContainer);
}

export { Modal };
