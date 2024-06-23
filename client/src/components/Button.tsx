import React from "react";
import clsx from "clsx";


enum ButtonType {
  Button = "button",
  Reset = "reset",
  Submit = "submit"
}

interface IProos{
    icon?:string;
    className?:string;
    label?:string;
    type?:ButtonType;
    onClick:()=>void;
}

const Button:React.FC<IProos> = ({icon,className,label,type,onClick=()=>{}}) => {
  return (
   <button
   onClick={onClick}
   type={type ||"button"}
   className={clsx("px-3 py-2 outline-none ",className)}
   >
    <span>{label}</span>
{icon && icon}
   </button>
  )
}

export default Button