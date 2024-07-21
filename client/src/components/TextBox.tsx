import React from "react";
import clsx from "clsx";

interface IProps {
  type?: string;
  placeholder?: string;
  label?: string;
  register: () => void;
  name?: string;
  className?: string;
  error?: string;
}

const TextBox = React.forwardRef<HTMLInputElement, IProps>(
  ({ type, placeholder, label, register, name, className, error }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800 ">
            {label}
          </label>
        )}
        <div>
          <input
            name={name}
            placeholder={placeholder}
            ref={ref}
            type={type}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder:text-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}
          />
        </div>
        {error && <span className="text-xs text-rose-500 mt-0.5">{error}</span>}
      </div>
    );
  }
);

export default TextBox;
