import React from "react";
import CloseIcon from "../assets/CloseIcon";

type ModalProps = {
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[20] bg-[#00000030] overflow-y-scroll">
      <div className="p-8 bg-base-100 relative my-4 w-[60%]">
        <h3 className="text-xl mb-6 font-semibold">{title}</h3>
        <div>{children}</div>
        <button className="absolute top-3 right-3 py-2 px-4 mt-3" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
