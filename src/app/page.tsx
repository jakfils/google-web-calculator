"use client";
import { useState } from "react";
import Screen from "./components/Screen";
import DigitPad from "./components/DigitPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
import { evaluate, abs } from "mathjs";
const functionMappings = [
  { value: "sin(pi/180*)", offset: -1 },
  { value: "sin()", offset: -1 },
  { value: "180/pi*asin()", offset: -1 },
  { value: "asin()", offset: -1 },
  { value: "log()", offset: -1 },
  { value: "pow(e,)", offset: -1 },
  { value: "pi", offset: 0 },
  { value: "cos(pi/180*)", offset: -1 },
  { value: "cos()", offset: -1 },
  { value: "log10()", offset: -1 },
  { value: "pow(10,)", offset: -1 },
  { value: "tan(pi/180*)", offset: -1 },
  { value: "tan()", offset: -1 },
  { value: "180/pi*atan()", offset: -1 },
  { value: "atan()", offset: -1 },
  { value: "sqrt()", offset: -1 },
  { value: "cbrt()", offset: -1 },
  { value: "^2", offset: 0 },
  { value: "Ans", offset: 0 },
];

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

  const handleAC = () => {
    setExpression((prev) => {
      // Si l'expression est vide ou juste "0", ne rien faire
      if (prev === "" || prev === "0") {
        setCursorPosition(1); // Positionner après le "0"
        return "0";
      }

      // Vérifier si le curseur est à l'intérieur d'une fonction
      const beforeCursor = prev.slice(0, cursorPosition);
      const afterCursor = prev.slice(cursorPosition);

      // Cas spécial: si le caractère avant le curseur est une parenthèse fermante
      if (beforeCursor.endsWith(")")) {
        // Vérifier si cette parenthèse fait partie d'une fonction
        for (const func of functionMappings) {
          const funcValue = func.value;

          // Si la fonction contient des parenthèses
          if (funcValue.includes("(") && funcValue.includes(")")) {
            // Extraire la partie de la fonction jusqu'à la parenthèse fermante incluse
            const closeParenIndex = funcValue.indexOf(")") + 1;
            const funcWithParen = funcValue.slice(0, closeParenIndex);

            // Vérifier si le texte avant le curseur se termine par la fonction avec parenthèses
            if (beforeCursor.endsWith(funcWithParen)) {
              // Calculer la nouvelle position du curseur en fonction de l'offset
              // La position sera juste après la parenthèse ouvrante ou à un autre endroit selon l'offset
              const openParenIndex = beforeCursor.lastIndexOf("(");
              const newCursorPos =
                openParenIndex + 1 + (func.offset === 0 ? 0 : func.offset);
              setCursorPosition(newCursorPos);
              return prev; // Ne pas modifier l'expression
            }
          }
        }
      }

      // Parcourir les fonctions pour voir si le curseur est à l'intérieur d'une d'entre elles
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

      // Si le curseur n'est pas dans une fonction, supprimer simplement un caractère
      if (cursorPosition > 0) {
        const newExpression = beforeCursor.slice(0, -1) + afterCursor;

        if (newExpression === "") {
          setCursorPosition(1); // Positionner après le "0"
          return "0";
        } else {
          setCursorPosition(cursorPosition - 1);
          return newExpression;
        }
      }

      return prev;
    });
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
            handleNthRoot={handleNthRoot}
          />
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
