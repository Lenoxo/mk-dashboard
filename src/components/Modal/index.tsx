import "./styles.css";
import { createPortal } from "react-dom";

const modalContainer = document.getElementById("modalContainer") as HTMLElement;

function Modal({ children }: { children: React.ReactNode }) {
  return createPortal(<div className="Modal">{children}</div>, modalContainer);
}

export { Modal };
