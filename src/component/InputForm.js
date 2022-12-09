import React, { useEffect, useRef } from "react";

function InputForm({ inputValue, result, resetHistory }) {
  const scrollRef = useRef();

  // on element increase it's autometically scroll down

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
    });
  });

  return (
    <div className="input_form">
      <div className="recent_result">
        <div className="result">
          {result ? (
            result.map((currentEL) => (
              <div ref={scrollRef} key={currentEL.id}>
                <p className="calculation">{currentEL.calculation}</p>
                <p className="res">={currentEL.res}</p>
              </div>
            ))
          ) : (
            <div ref={scrollRef} />
          )}
        </div>
        <span
          title="reset"
          className={`reset ${result ? "active" : ""}`}
          onClick={resetHistory}
        >
          <i className="bx bx-reset" />
        </span>
      </div>
      <div className="form-group">
        <div className="input_field">{inputValue}</div>
        <div className="jump" />
      </div>
    </div>
  );
}

export default InputForm;
