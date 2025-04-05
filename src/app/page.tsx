"use client";
import { useState } from "react";
import Screen from "./components/Screen";
import DigitPad from "./components/DigitPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
import { evaluate, abs } from "mathjs";

export default function Home() {
  const [isFxActive, setIsFxActive] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>("0");
  const [displayedExpression, setDisplayedExpression] = useState<string>("0");
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

  const handleDisplayedExpression = (expression: string) => {
    setDisplayedExpression(() => {
      return expression
        .replaceAll("180/pi*", "")
        .replaceAll("pi/180*", "")
        .replaceAll("180/pi*", "")
        .replaceAll("sqrt", "√")
        .replaceAll("*", "×")
        .replaceAll("/", "÷");
    });
  };

  const functionMappings = [
    "180/pi*asin()",
    "180/pi*acos()",
    "180/pi*atan()",
    "sin(pi/180*)",
    "cos(pi/180*)",
    "tan(pi/180*)",
    "asin()",
    "acos()",
    "atan()",
    "sin()",
    "cos()",
    "tan()",
    "pow(10,)",
    "pow(e,)",
    "logTen()",
    "log()",
    "sqrt()",
    "()",
    "pi",
    "^2",
    "Ans",
  ];

  // ******************************************************************************************
  const handleAC = () => {
    setExpression((prev) => {
      if (prev.length === 0) return prev;
      const cursorPos: number = cursorPosition;
      const beforeCursor = prev.slice(0, cursorPosition);
      const afterCursor = prev.slice(cursorPosition);

      if (beforeCursor.length === 0) return afterCursor; // Si on est au début, rien à supprimer avant

      // Détection spéciale pour nthRoot() avec gestion d'imbrication
      const nthRootIndex: number = findNthRootStart(prev, cursorPos);
      if (nthRootIndex !== -1) {
        const closingIndex: number = findMatchingClosingParen(
          prev,
          nthRootIndex + 8,
        ); // +8 pour "nthRoot("
        if (closingIndex !== -1) {
          const newExpr: string =
            prev.substring(0, nthRootIndex) + prev.substring(closingIndex + 1);
          setCursorPosition(nthRootIndex);
          return newExpr === "" ? "0" : newExpr;
        }
      }
      // Nouveau bloc: Vérifier si le curseur est juste après une parenthèse fermante
      // et que cette parenthèse correspond à une fonction complète
      if (beforeCursor.endsWith(")")) {
        let openParenIndex = -1;
        let parenCount = 1;

        // Parcourir à rebours pour trouver la parenthèse ouvrante correspondante
        for (let i = beforeCursor.length - 2; i >= 0; i--) {
          if (beforeCursor[i] === ")") parenCount++;
          if (beforeCursor[i] === "(") parenCount--;

          if (parenCount === 0) {
            openParenIndex = i;
            break;
          }
        }

        if (openParenIndex !== -1) {
          // Vérifier si avant la parenthèse ouvrante il y a une de nos fonctions
          for (const funcValue of functionMappings.filter((f) =>
            f.includes("("),
          )) {
            const funcName = funcValue.split("(")[0];
            if (beforeCursor.slice(0, openParenIndex).endsWith(funcName)) {
              // Supprimer toute la fonction
              const newBeforeCursor = beforeCursor.slice(
                0,
                openParenIndex - funcName.length,
              );
              const newExpression = newBeforeCursor + afterCursor;

              setCursorPosition(newBeforeCursor.length);
              
              return newExpression === "" ? "0" : newExpression;
            }
          }
        }
      }

      // Vérifier si le curseur est à l'intérieur d'une fonction
      for (const funcValue of functionMappings) {
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
      for (const func of functionMappings.filter((f) => !f.includes("("))) {
        if (beforeCursor.endsWith(func)) {
          setCursorPosition(cursorPosition - func.length);
          return beforeCursor.slice(0, -func.length) + afterCursor;
        }
      }

      // Suppression caractère par caractère par défaut
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

  // Helper typé avec substring() au lieu de substr()
  function findNthRootStart(expr: string, cursorPos: number): number {
    let index: number = Math.min(cursorPos - 1, expr.length - 1);
    while (index >= 0) {
      if (expr.substring(index, index + 8) === "nthRoot(") {
        return index;
      }
      index--;
    }
    return -1;
  }

  // Helper typé inchangé
  function findMatchingClosingParen(expr: string, openPos: number): number {
    let parenCount: number = 1;
    for (let i: number = openPos + 1; i < expr.length; i++) {
      if (expr[i] === "(") parenCount++;
      if (expr[i] === ")") parenCount--;
      if (parenCount === 0) return i;
    }
    return -1;
  }

  // **********************************************************************************

  const handleMultipleOperations = (value: string) => {
    handleEqualButton("none");
    setExpression(result.toString() + value);
    setCursorPosition(result.toString().length + 1);
    handleDisplayedExpression(result.toString() + value);
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
      handleDisplayedExpression(newExpression);
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
            displayedExpession={displayedExpression}
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
            displayedExpression={displayedExpression}
            handleDisplayedExpression={handleDisplayedExpression}
            expression={expression}
          />
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
