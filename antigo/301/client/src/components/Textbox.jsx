import React from "react";

const Textbox = ({ label, type, name, placeholder, className, error, register }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 ${className} ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...register}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Textbox;
