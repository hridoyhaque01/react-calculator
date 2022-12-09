import React from "react";

function InputButtons({ handleClick }) {
  const buttonValues = [
    {
      value: "ac",
      key: "AC",
    },
    {
      value: "⨉",
      key: "⨉",
    },
    {
      value: "%",
      key: "%",
    },
    {
      value: "/",
      key: "÷",
    },
    {
      value: "7",
      key: "7",
    },
    {
      value: "8",
      key: "8",
    },
    {
      value: "9",
      key: "9",
    },
    {
      value: "*",
      key: "×",
    },
    {
      value: "4",
      key: "4",
    },
    {
      value: "5",
      key: "5",
    },
    {
      value: "6",
      key: "6",
    },
    {
      value: "-",
      key: "-",
    },
    {
      value: "1",
      key: "1",
    },
    {
      value: "2",
      key: "2",
    },
    {
      value: "3",
      key: "3",
    },
    {
      value: "+",
      key: "+",
    },
    {
      value: "0",
      key: "0",
    },
    {
      value: ".",
      key: ".",
    },
    {
      value: "=",
      key: "=",
    },
  ];

  return (
    <div action="" className="input_btn">
      {buttonValues.map((currentEL) => (
        <button
          type="button"
          key={currentEL.key}
          value={currentEL.value}
          onClick={() => handleClick(currentEL.key)}
        >
          {currentEL.key}
        </button>
      ))}
    </div>
  );
}

export default InputButtons;
