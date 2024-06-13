import React, { useEffect, useRef, useState } from "react";
import { MapCss } from "../../../utils/utils";
import Styles from "./modal.module.scss";
import useOutsideClick from "../../../utils/hooks/useOutsideClick";

interface ModalProps {
  state: boolean;
  closeOnClickOutside?: boolean;
  children?: React.ReactNode;
  stateHandler: React.Dispatch<React.SetStateAction<boolean>>;
  hasWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Modal({
  state,
  stateHandler,
  children,
  closeOnClickOutside = false,
  hasWidth,
  className = "",
  style = {},
}: ModalProps) {
  useEffect(() => {
    if (state) {
      document.body.classList.add("body-overflow-hidden");
    } else {
      document.body.classList.remove("body-overflow-hidden");
    }
    return () => {
      document.body.classList.remove("body-overflow-hidden");
    };
  }, [state]);

  const modalContentRef = useRef(null);

  useOutsideClick(
    modalContentRef,
    () => closeOnClickOutside && stateHandler(false)
  );

  return (
    <div>
      <div
        className={MapCss(
          Styles,
          "my-modal",
          `${
            state ? "flex" : "hidden"
          }  items-center justify-center ${className}`
        )}
        style={{ zIndex: 1000, ...style }}
      >
        <div
          className="h-full w-full absolute top-0 left-0 right-0 bottom-0 z-0"
          onClick={() => stateHandler(false)}
        ></div>
        <div className="z-40 modal-width h-full relative w-full flex justify-center items-center">
          <div
            className={`${hasWidth ? "" : "w-[inherit]"} flex justify-center`}
            ref={modalContentRef}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
