"use client";
import { useState } from "react";
import Screen from "./components/Screen";
import DigitPad from "./components/DigitPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
import { evaluate } from "mathjs";
export default function Home() {
  const [isFxActive, setIsFxActive] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>("0");
  const [result, setResult] = useState<number | string>(0);
  const [isEqualButton, SetIsEqualButton] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(
    expression.length,
  );
  const resetExpression = () => {
    setExpression("0");
  };
  const handleEqualButton = (value: string) => {
    SetIsEqualButton(value === "equal");
  };

  const handleInsert = (value: string, offset: number = 0) => {
    setExpression((prev) => {
      handleEqualButton("none");
      const cleanPrev = prev === "0" ? "" : prev;

      const beforeCursor = cleanPrev.slice(0, cursorPosition);
      const afterCursor = cleanPrev.slice(cursorPosition);
      const newExpression = beforeCursor + value + afterCursor;

      const newCursorPos = beforeCursor.length + offset;
      setCursorPosition(newCursorPos);
      console.log(expression);

      return newExpression;
    });
  };

  const handleFx = (value: string) => {
    setIsFxActive(value === "fx");
  };
  const handleResult = () => {
    try {
      let expr = expression;
      if (expr.startsWith("*") || expr.startsWith("/")) {
        expr = "0" + expr;
      }
      setResult(evaluate(expr) as number);
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
            expression={expression}
            result={result}
            handleResult={handleResult}
            isEqualButton={isEqualButton}
            handleIsEqualButton={handleEqualButton}
            onInsert={handleInsert}
            resetExpression={resetExpression}
          />
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
