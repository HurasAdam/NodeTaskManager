import clsx from "clsx";
import React from "react";

const Title:React.FC = ({title, className}) => {
  return (
    <div className={clsx("text-2xl font-semibold capitalize",className)}>
{title}
    </div>
  )
};

export default Title;