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

  const handleNthRoot = () => {
    handleEqualButton("none");
    setExpression((prev) => {
      const beforeCursor = prev.slice(0, cursorPosition);
      const afterCursor = prev.slice(cursorPosition);
      const number = beforeCursor.match(/\d+$/);
      let newExpression = beforeCursor + afterCursor;
      if (number && isEqualButton) {
        newExpression = "nthRoot(" + result.toString() + ",)";
        const newCursorPos = result.toString().length + 9;
        setCursorPosition(newCursorPos);
      }
      if (number && !isEqualButton) {
        newExpression =
          beforeCursor.slice(0, -number.toString().length) +
          "nthRoot(" +
          number +
          ",)" +
          afterCursor;
        const newCursorPos = beforeCursor.length + 9;
        setCursorPosition(newCursorPos);
      }

      return newExpression;
    });
  };

  const functionMappings = [
    // { value: "()", offset: -1 },
    { value: "sin(pi/180*)", offset: -1 },
    { value: "180/pi*asin()", offset: -1 },
    { value: "180/pi*atan()", offset: -1 },
    { value: "asin()", offset: -1 },
    { value: "atan()", offset: -1 },
    { value: "logdix()", offset: -1 },
    { value: "pow(10,)", offset: -1 },
    { value: "tan(pi/180*)", offset: -1 },
    { value: "acos()", offset: -1 },
    { value: "sin()", offset: -1 },
    { value: "cos(pi/180*)", offset: -1 },
    { value: "cos()", offset: -1 },
    { value: "log()", offset: -1 },
    { value: "pow(e,)", offset: -1 },
    { value: "pi", offset: 0 },
    { value: "tan()", offset: -1 },
    { value: "sqrt()", offset: -1 },
    { value: "nthRoot()", offset: -1 },
    { value: "^2", offset: 0 },
    { value: "Ans", offset: 0 },
  ];

  // ******************************************************************************************
  const handleAC = () => {
    setExpression((prev) => {
      if (prev.length === 0) return prev;

      const beforeCursor = prev.slice(0, cursorPosition);
      const afterCursor = prev.slice(cursorPosition);

      if (beforeCursor.length === 0) return afterCursor; // Si on est au début, rien à supprimer avant

      // Vérifier si le curseur est à l'intérieur d'une fonction
      for (const func of functionMappings) {
        const funcValue = func.value;

        // Vérifier différentes positions possibles du curseur dans la fonction
        for (let i = 1; i <= funcValue.length; i++) {
          const funcStart = funcValue.slice(0, i);
          const funcEnd = funcValue.slice(i);

          // Si le texte avant le curseur se termine par le début de la fonction
          // et le texte après le curseur commence par la fin de la fonction
          if (
            beforeCursor.endsWith(funcStart) &&
            afterCursor.startsWith(funcEnd)
          ) {
            // Supprimer la fonction entière
            const newBeforeCursor = beforeCursor.slice(
              0,
              beforeCursor.length - funcStart.length,
            );
            const newAfterCursor = afterCursor.slice(funcEnd.length);
            const newExpression = newBeforeCursor + newAfterCursor;

            // Mettre à jour la position du curseur
            setCursorPosition(newBeforeCursor.length);

            // Si l'expression devient vide, retourner "0"
            if (newExpression === "") {
              setCursorPosition(1); // Positionner après le "0"
              return "0";
            } else {
              return newExpression;
            }
          }
        }
      }

      // Vérifier si le curseur est juste après une fonction complète sans parenthèses
      for (let func of functionMappings.filter(
        (f) => !f.value.includes("()"),
      )) {
        if (beforeCursor.endsWith(func.value)) {
          setCursorPosition(cursorPosition - func.value.length);
          return beforeCursor.slice(0, -func.value.length) + afterCursor;
        }
      }

      // Vérifier si le curseur est juste après une parenthèse fermante qui appartient à une fonction
      const lastCloseParen = beforeCursor.lastIndexOf(")");
      if (lastCloseParen !== -1 && lastCloseParen === beforeCursor.length - 1) {
        const stack = [];
        let functionStart = -1;

        for (let i = lastCloseParen; i >= 0; i--) {
          if (beforeCursor[i] === ")") stack.push(")");
          else if (beforeCursor[i] === "(") {
            stack.pop();
            if (stack.length === 0) {
              functionStart = i;
              break;
            }
          }
        }

        if (functionStart !== -1) {
          const functionNameMatch = beforeCursor
            .slice(0, functionStart)
            .match(/([a-z]+)$/i);
          if (functionNameMatch && functionNameMatch.index !== undefined) {
            setCursorPosition(functionNameMatch.index);
            return prev.slice(0, functionNameMatch.index) + afterCursor;
          }
        }
      }

      // Vérifier si le curseur est avant une parenthèse fermante d'une fonction vide
      for (let func of functionMappings.filter((f) => f.value.includes("()"))) {
        const funcBase = func.value.replace("()", "");
        const regex = new RegExp(`(${funcBase}\\()$`);
        if (beforeCursor.match(regex) && afterCursor.startsWith(")")) {
          setCursorPosition(cursorPosition - funcBase.length - 1);
          return (
            beforeCursor.slice(0, -funcBase.length - 1) + afterCursor.slice(1)
          );
        }
      }

      // Suppression caractère par caractère par défaut
      setCursorPosition(cursorPosition - 1);
      return beforeCursor.slice(0, -1) + afterCursor;
    });
  };

  // **********************************************************************************

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
        value === "+" ||
        value === "^2";
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
      const containsLogTen = expression.includes("logTen");
      const evaluatedExpression =
        containAns || containsLogTen
          ? evaluate(
              expression
                .replace(/Ans/g, `(${result.toString()})`)
                .replace(/logTen/g, "log10"),
            )
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
            handleNthRoot={handleNthRoot}
          />
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
