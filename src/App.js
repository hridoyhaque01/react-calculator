import { evaluate } from "mathjs";
import { useEffect, useState } from "react";
import "./App.css";
import InputButtons from "./component/InputButtons";
import InputForm from "./component/InputForm";

const getStoreResult = () => {
  const lists = localStorage.getItem("calculator");
  if (lists) {
    return JSON.parse(lists);
  }
  return [];
};

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return JSON.parse(theme);
  }
  return "dark-theme";
};

const paramiters = ["+", "-", "×", "÷", "%"];

function App() {
  const [input, setInput] = useState("");
  const [dot, setDot] = useState(false);
  const [result, setResult] = useState(getStoreResult());
  const [showColors, setShowColors] = useState(false);
  const [bgColor, setBgColor] = useState(getTheme());

  const getResult = () => {
    let tempVar = input;
    tempVar = tempVar.replace(/×/g, "*");
    tempVar = tempVar.replace(/÷/g, "/");
    if (paramiters.includes(tempVar.slice(-1))) {
      tempVar = tempVar.slice(0, -1);
    }

    // calculate result

    let resultCal = evaluate(tempVar);

    // if result is decimal number

    if (resultCal / 1 !== 0) {
      resultCal = resultCal.toFixed(2);
    }

    // result sheet object

    const resultSheet = {
      id: new Date().getTime().toString(),
      calculation: tempVar,
      res: resultCal,
    };

    setResult([...result, resultSheet]);
    setInput("");
  };

  const buttonClick = (event) => {
    // if event is backspace

    if (event === "⨉") {
      if (!input) return;
      const lastValue = input.slice(-1);
      if (lastValue === ".") {
        setDot(false);
      }
      setInput(input.slice(0, -1));
      return;
    }

    // if event want to clear all

    if (event === "AC") {
      setInput("");
      setDot(false);
      return;
    }

    // if event is parameters

    if (
      event === "%" ||
      event === "÷" ||
      event === "×" ||
      event === "-" ||
      event === "+"
    ) {
      const lastValue = input.slice(-1);
      if (paramiters.includes(lastValue)) {
        const newVal = input.slice(0, -1);
        setInput(newVal + event);
        setDot(false);
        return;
      }

      setInput((props) => props + event);
      setDot(false);
      return;
    }

    // if event is dot

    if (event === ".") {
      if (!dot) {
        const lastValue = input.slice(-1);

        if (lastValue === "%") {
          setInput((props) => `${props}×0`);
        }
        if (input.length === 0) {
          setInput("0");
        }
        setInput((props) => props + event);
        setDot(true);
      }

      return;
    }

    // get result or event is equal [=]

    if (event === "=") {
      getResult();
      return;
    }

    const lastValue = input.slice(-1);

    // if event is percentage

    if (lastValue === "%") {
      setInput((props) => `${props}×`);
    }

    const lastSecondVal = input.charAt(input.length - 2);

    // if input first value is 0 or null

    if (
      lastValue === "0" &&
      (input.length === 1 || paramiters.includes(lastSecondVal))
    ) {
      let tempVar = input;
      tempVar = tempVar.slice(0, -1);
      setInput(tempVar);
    }

    setInput((props) => props + event);
  };

  // reset history

  const resetHistory = () => {
    setResult("");
  };

  useEffect(() => {
    localStorage.setItem("calculator", JSON.stringify(result));
  }, [result]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(bgColor));
  }, [bgColor]);

  return (
    <div className="app">
      <div className="content" data-theme={bgColor}>
        <i
          className="bx bx-dots-vertical-rounded menu_btn"
          onClick={() => setShowColors((props) => !props)}
        />
        <div className={`bgColors ${showColors ? "active" : ""}`}>
          <h6>select background color</h6>
          <div className="colors">
            <span
              className="color white"
              onClick={() => setBgColor("white-theme")}
            />
            <span className="bdr" />

            <span
              className="color dark"
              onClick={() => setBgColor("dark-theme")}
            />
            <span className="bdr" />
            <span
              className="color blue"
              onClick={() => setBgColor("blue-theme")}
            />
            <span className="transparent">transparent</span>
          </div>
        </div>

        <InputForm
          resetHistory={resetHistory}
          result={result}
          inputValue={input}
        />
        <InputButtons handleClick={buttonClick} />
      </div>
    </div>
  );
}

export default App;
