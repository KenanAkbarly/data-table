import React from "react";

const Input = (props) => {
  return (
    <>
      <input
        type="text"
        className="p-4  rounded-md border-2 h-10"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
};

export default Input;
