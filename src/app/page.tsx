"use client";
import { useState } from "react";
import Screen from "./components/Screen";
import DigitPad from "./components/DigitPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
import { evaluate, abs } from "mathjs";
export default function Home() {
  const [isFxActive, setIsFxActive] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>("0");
  const [result, setResult] = useState<number | string>(0);
  const [isEqualButton, SetIsEqualButton] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(
    expression.length,
  );
  const [isDegActive, setIsDegActive] = useState<boolean>(false);
  const resetExpression = () => {
    setExpression("0");
  };
  const handleDegActive = (value: string) => {
    setIsDegActive(value === "deg");
  };
  const handleEqualButton = (value: string) => {
    SetIsEqualButton(value === "equal");
  };

  const handleCloseBracket = () => {
    const beforeCursor = expression.slice(0, cursorPosition);
    const afterCursor = expression.slice(cursorPosition);
    const position = afterCursor.indexOf(")");
    const newCursorPos = beforeCursor.length + position + 1;
    setCursorPosition(newCursorPos);
  };
  const handleAC = () => {
    // handleEqualButton("none");
    // expression.length === 1
    //   ? setExpression("0")
    //   : isEqualButton
    //     ? setExpression("0")
    //     : setExpression((prev) => prev.slice(0, -1));
  };
  const handleMultipleOperations = (value: string) => {
    handleEqualButton("none");
    setExpression(result.toString() + value);
    setCursorPosition(result.toString().length + 1);
  };
  const handleInsert = (value: string, offset: number = 0) => {
    setExpression((prev) => {
      handleEqualButton("none");

      // Vérifier si la première value est "*" ou "!"
      const keepZero =
        value === "*" ||
        value === "!" ||
        value === "." ||
        value === "%" ||
        value === "/" ||
        value === "^" ||
        value === "-" ||
        value === "+";
      const cleanPrev = prev === "0" && !keepZero ? "" : prev;

      const beforeCursor = cleanPrev.slice(0, cursorPosition);
      const afterCursor = cleanPrev.slice(cursorPosition);

      const lastChar = beforeCursor.slice(-1);
      // const isLastOperator = /[+\-*/]/.test(lastChar);
      const isLastOperator = ["+", "-", "*", "/"].includes(lastChar);
      // const isNewOperator = /[+\-*/]/.test(value);
      const isNewOperator = ["+", "-", "*", "/"].includes(value);

      let newExpression = beforeCursor + value + afterCursor;

      if (isLastOperator && isNewOperator) {
        if (!(lastChar === "*" && value === "-")) {
          newExpression = beforeCursor.slice(0, -1) + value + afterCursor;
        }
      }

      const newCursorPos = beforeCursor.length + offset;
      setCursorPosition(newCursorPos);

      return newExpression;
    });
  };

  const handleFx = (value: string) => {
    setIsFxActive(value === "fx");
  };
  const handleResult = () => {
    try {
      const containAns = expression.includes("Ans");
      const evaluatedExpression = containAns
        ? evaluate(expression.replace(/Ans/g, `(${result.toString()})`))
        : evaluate(expression);
      // Vérifier si le résultat est un nombre complexe (contient "i")
      if (
        evaluatedExpression.toString().includes("i") ||
        evaluatedExpression.toString().includes("infinity")
      ) {
        throw new Error("Imaginaire ou infini");
      }

      setResult(
        abs(evaluatedExpression) < 1e-14 ? 0 : (evaluatedExpression as number),
      );
    } catch (error) {
      setResult("Error");
      console.error("Expression invalide :", error);
    }
  };

  return (
    <>
      <main className="m-2 w-full rounded-sm bg-[var(--calculator-bg-color)] p-1 sm:w-4/5 md:w-3/4 lg:w-[640px]">
        <div>
          <Screen
            result={result}
            expression={expression}
            isEqualButton={isEqualButton}
            cursorPosition={cursorPosition}
          />
        </div>
        <div>
          <DigitPad
            isFxActive={isFxActive}
            handleResult={handleResult}
            isEqualButton={isEqualButton}
            handleIsEqualButton={handleEqualButton}
            onInsert={handleInsert}
            resetExpression={resetExpression}
            isDegActive={isDegActive}
            handleDegActive={handleDegActive}
            handleAC={handleAC}
            handleCloseBracket={handleCloseBracket}
            handleMultipleOperations={handleMultipleOperations}
          />
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
