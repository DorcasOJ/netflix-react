import React, { useState } from "react";

const PasswordInput = ({ setPassword, placeholder }) => {
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-between border-1 border-gray-300 rounded text-sm w-full mb-2">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="current-password"
        className="px-3 py-2 bg-transparent focus:border-none focus:outline-none w-full"
        onChange={onChange}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className=" px-2 cursor-pointer"
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;
