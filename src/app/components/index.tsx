import React, { PropsWithChildren, ReactNode } from "react";

interface Props {
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  children?: ReactNode;
}

const Button = ({ type, onClick, children }: Props) => {
  return (
    <button
      type={type}
      className="bg-blue-700 hover:bg-blue-500 text-white rounded-xl p-2 w-24 self-center mt-4x cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
