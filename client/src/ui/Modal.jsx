import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const closewindow = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ openName, setOpenName, closewindow }}>
      <span>{children}</span>
    </ModalContext.Provider>
  );
}
function Open({ children, nameToOpenWidow }) {
  const { setOpenName } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => setOpenName(nameToOpenWidow),
  });
}
function Window({ children, name }) {
  const { openName, closewindow } = useContext(ModalContext);
  const ref = useRef();
  useEffect(
    function () {
      function HandleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          closewindow();
        }
      }
      document.addEventListener("click", HandleClick, true);
      return () => document.removeEventListener("click", HandleClick, true);
    },
    [closewindow]
  );
  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={closewindow}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { closewindow: closewindow })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
