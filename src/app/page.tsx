"use client";
import { useState, useEffect } from "react";
import Screen from "./components/Screen";
import DigitPad from "./components/DigitPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
import History from "./components/History";
import { evaluate, format } from "mathjs";

export default function Home() {
  // State for calculator functionality
  const [isFxActive, setIsFxActive] = useState<boolean>(false); // Toggle for function pad
  const [expression, setExpression] = useState<string>("0"); // Raw math expression
  const [displayedExpression, setDisplayedExpression] = useState<string>("0"); // Formatted expression for display
  const [result, setResult] = useState<number | string>(0); // Calculation result
  const [isEqualButton, SetIsEqualButton] = useState<boolean>(false); // Track if equals was pressed
  const [cursorPosition, setCursorPosition] = useState<number>(
    expression.length,
  ); // Cursor position in expression
  const [isDegActive, setIsDegActive] = useState<boolean>(false); // Degrees/radians mode
  const [isHistoryShown, setIsHistoryShown] = useState<boolean>(false); // History panel visibility
  const [history, setHistory] = useState<
    // Calculation history
    {
      id: number;
      expression: string;
      displayedExpression: string;
      result: number | string;
    }[]
  >([]);

  // Reset expression to "0"
  const resetExpression = () => {
    setExpression("0");
  };

  // Toggle between degrees and radians
  const handleDegActive = (value: string) => {
    setIsDegActive(value === "deg");
  };

  // Track equals button state
  const handleEqualButton = (value: string) => {
    SetIsEqualButton(value === "equal");
  };

  // Handle clicking on history items
  const handleHistoryItemClick = (value: string) => {
    handleInsert(value, value.length);
  };

  // Move cursor to closing bracket position
  const handleCloseBracket = () => {
    const beforeCursor = expression.slice(0, cursorPosition);
    const afterCursor = expression.slice(cursorPosition);
    const position = afterCursor.indexOf(")");
    const newCursorPos = beforeCursor.length + position + 1;
    setCursorPosition(newCursorPos);
  };

  // Handle nth root operation
  const handleNthRoot = () => {
    handleEqualButton("none");
    setExpression((prev) => {
      const beforeCursor = prev.slice(0, cursorPosition);
      const afterCursor = prev.slice(cursorPosition);
      const match = beforeCursor.match(/(-?\d*\.?\d+|e|pi)$/);
      let newExpression = beforeCursor + afterCursor;

      // Handle nthRoot after equals press
      if (match && isEqualButton) {
        if (result !== "Error") {
          newExpression = "nthRoot(" + result.toString() + ",)";
          const newCursorPos = result.toString().length + 9;
          setCursorPosition(newCursorPos);
        } else {
          newExpression = "nthRoot(0,)";
          setCursorPosition(10);
        }
      }

      // Handle nthRoot during normal input
      if (match && !isEqualButton) {
        newExpression =
          beforeCursor.slice(0, -match[0].toString().length) +
          "nthRoot(" +
          match[0] +
          ",)" +
          afterCursor;
        const newCursorPos = beforeCursor.length + 9;
        setCursorPosition(newCursorPos);
      }

      return newExpression;
    });
  };

  // Toggle history panel
  const handleIsHistoryShown = () => {
    setIsHistoryShown(!isHistoryShown);
  };

  // Format expression for display using LaTeX
  useEffect(() => {
    const formatted = expression
      .replace(
        /\^([^()\s+\-*/^{]*)(\(([^()]*|\([^()]*\))*\))?/g,
        (_match, simplePart, parenPart) => {
          const content = (simplePart || "") + (parenPart || "");
          return `^{${content}}`;
        },
      )
      .replace(
        /pow\(10\s*,\s*((?:[^()]*|\([^()]*\))*)\)/g,
        (_match, b) => `10^{${b || ""}}`,
      )
      .replace(
        /pow\(e\s*,\s*((?:[^()]*|\([^()]*\))*)\)/g,
        (_match, b) => `e^{${b || ""}}`,
      )
      .replaceAll("180/pi*", "")
      .replaceAll("pi/180*", "")
      .replaceAll("*", "×")
      .replaceAll("/", "÷")
      .replaceAll("pi", "π")
      .replaceAll("log", "ln")
      .replaceAll("LgTen", "log")
      .replaceAll("%", "\\%")
      .replace(
        /nthRoot\(([^,]+?)\s*,\s*((?:[^()]*|\([^()]*\))*)\)/g,
        (_match, a, b) => `\\sqrt[${b || ""}]{${a || ""}}`,
      )
      .replace(
        /sqrt\(((?:[^()]*|\([^()]*\))*)\)/g,
        (_match, b) => `\\sqrt{${b}}`,
      );

    setDisplayedExpression(formatted);
  }, [expression]);

  // Close history when clicking outside
  useEffect(() => {
    const handleBodyClick = () => {
      setIsHistoryShown(false);
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  // Supported math functions
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
    "LgTen()",
    "log()",
    "sqrt()",
    "()",
    "pi",
    "^2",
    "Ans",
  ];

  // Handle AC (All Clear) button
  const handleAC = () => {
    setExpression((prev) => {
      if (prev.length === 0) return prev;
      const cursorPos: number = cursorPosition;
      const beforeCursor = prev.slice(0, cursorPosition);
      const afterCursor = prev.slice(cursorPosition);

      if (beforeCursor.length === 0) return afterCursor;

      // Special handling for nthRoot deletion
      const nthRootIndex: number = findNthRootStart(prev, cursorPos);
      if (nthRootIndex !== -1) {
        const closingIndex: number = findMatchingClosingParen(
          prev,
          nthRootIndex + 8,
        );
        if (closingIndex !== -1) {
          const newExpr: string =
            prev.substring(0, nthRootIndex) + prev.substring(closingIndex + 1);
          setCursorPosition(nthRootIndex);
          return newExpr === "" ? "0" : newExpr;
        }
      }

      // Handle deletion of functions with parentheses
      if (beforeCursor.endsWith(")")) {
        let openParenIndex = -1;
        let parenCount = 1;

        for (let i = beforeCursor.length - 2; i >= 0; i--) {
          if (beforeCursor[i] === ")") parenCount++;
          if (beforeCursor[i] === "(") parenCount--;

          if (parenCount === 0) {
            openParenIndex = i;
            break;
          }
        }

        if (openParenIndex !== -1) {
          for (const funcValue of functionMappings.filter((f) =>
            f.includes("("),
          )) {
            const funcName = funcValue.split("(")[0];
            if (beforeCursor.slice(0, openParenIndex).endsWith(funcName)) {
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

      // Handle partial function deletion
      for (const funcValue of functionMappings) {
        for (let i = 1; i <= funcValue.length; i++) {
          const funcStart = funcValue.slice(0, i);
          const funcEnd = funcValue.slice(i);

          if (
            beforeCursor.endsWith(funcStart) &&
            afterCursor.startsWith(funcEnd)
          ) {
            const newBeforeCursor = beforeCursor.slice(
              0,
              beforeCursor.length - funcStart.length,
            );
            const newAfterCursor = afterCursor.slice(funcEnd.length);
            const newExpression = newBeforeCursor + newAfterCursor;

            setCursorPosition(newBeforeCursor.length);

            if (newExpression === "") {
              setCursorPosition(1);
              return "0";
            } else {
              return newExpression;
            }
          }
        }
      }

      // Handle simple function deletion
      for (const func of functionMappings.filter((f) => !f.includes("("))) {
        if (beforeCursor.endsWith(func)) {
          setCursorPosition(cursorPosition - func.length);
          return beforeCursor.slice(0, -func.length) + afterCursor;
        }
      }

      // Default case - delete single character
      if (cursorPosition > 0) {
        const newExpression = beforeCursor.slice(0, -1) + afterCursor;

        if (newExpression === "") {
          setCursorPosition(1);
          return "0";
        } else {
          setCursorPosition(cursorPosition - 1);
          return newExpression;
        }
      }
      return prev;
    });
  };

  // Helper to find nthRoot start position
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

  // Helper to find matching closing parenthesis
  function findMatchingClosingParen(expr: string, openPos: number): number {
    let parenCount: number = 1;
    for (let i: number = openPos + 1; i < expr.length; i++) {
      if (expr[i] === "(") parenCount++;
      if (expr[i] === ")") parenCount--;
      if (parenCount === 0) return i;
    }
    return -1;
  }

  // Handle inserting operations after equals press
  const handleMultipleOperations = (value: string) => {
    handleEqualButton("none");
    if (result !== "Error") {
      setExpression(result.toString() + value);
      setCursorPosition(result.toString().length + 1);
    } else {
      setExpression("0" + value);
      setCursorPosition(2);
    }
  };

  // Handle inserting values into expression
  const handleInsert = (value: string, offset: number = 0) => {
    setExpression((prev) => {
      handleEqualButton("none");

      // Determine if we should keep the initial zero
      const keepZero =
        value === "*" ||
        value === "!" ||
        value === "." ||
        value === "%" ||
        value === "/" ||
        value === "^" ||
        value === "+" ||
        value === "^2";

      const cleanPrev = prev === "0" && !keepZero ? "" : prev;

      const beforeCursor = cleanPrev.slice(0, cursorPosition);
      const afterCursor = cleanPrev.slice(cursorPosition);

      const lastChar = beforeCursor.slice(-1);
      const lastTwoChars = beforeCursor.slice(-2);

      const isLastOperator = ["+", "-", "*", "/", "^"].includes(lastChar);
      const isNewOperator = ["+", "-", "*", "/", "^"].includes(value);

      const endsWithPi = lastTwoChars === "pi";
      const endsWithE = lastChar === "e";
      const endsWithPercent = lastChar === "%";

      const isLastCharDigit = /\d/.test(lastChar);
      const isPow10 = value === "pow(10,)";

      // Determine if we need implicit multiplication
      const needsMultiplication =
        !isNewOperator &&
        (endsWithPi ||
          endsWithE ||
          endsWithPercent ||
          (isLastCharDigit && isPow10));
      const shouldSkipMultiplication = value === "^2";
      const beforeInsert =
        needsMultiplication && !shouldSkipMultiplication
          ? beforeCursor + "*"
          : beforeCursor;

      let newExpression = beforeInsert + value + afterCursor;

      // Handle operator replacement
      if (isLastOperator && isNewOperator) {
        if (!(lastChar === "*" && value === "-")) {
          newExpression = beforeCursor.slice(0, -1) + value + afterCursor;
        }
      }

      const newCursorPos =
        beforeCursor.length + (needsMultiplication ? 1 : 0) + offset;

      setCursorPosition(newCursorPos);
      return newExpression;
    });
  };

  // Toggle function pad
  const handleFx = (value: string) => {
    setIsFxActive(value === "fx");
  };

  // Calculate and display result
  const handleResult = () => {
    try {
      const containAns = expression.includes("Ans");
      const containsLogTen = expression.includes("LgTen");
      const evaluatedExpression =
        containAns || containsLogTen
          ? evaluate(
              expression
                .replace(/Ans/g, `(${result.toString()})`)
                .replace(/LgTen/g, "log10"),
            )
          : evaluate(expression);

      // Handle complex/undefined results
      if (
        evaluatedExpression.toString().includes("i") ||
        evaluatedExpression.toString().includes("infinity")
      ) {
        throw new Error("Imaginary or infinite");
      }
      const formatedResult = format(evaluatedExpression, { precision: 11 });

      setResult(formatedResult);

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          expression: expression,
          displayedExpression: displayedExpression,
          result: evaluatedExpression,
        },
      ]);
    } catch {
      setResult("Error");
      const evaluatedExpression: string = "Error";
      setHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          expression: expression,
          displayedExpression: displayedExpression,
          result: evaluatedExpression,
        },
      ]);
    }
  };

  return (
    <>
      <main className="relative m-2 w-full rounded-sm bg-[var(--calculator-bg-color)] p-1 sm:w-4/5 md:w-3/4 lg:w-[640px]">
        <div>
          <Screen
            result={result}
            expression={expression}
            isEqualButton={isEqualButton}
            cursorPosition={cursorPosition}
            displayedExpression={displayedExpression}
            handleIsHistoryShown={handleIsHistoryShown}
            history={history}
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
        <History
          isHistoryShown={isHistoryShown}
          handleIsHistoryShown={handleIsHistoryShown}
          history={history}
          onHistoryItemClick={handleHistoryItemClick}
        ></History>
      </main>
    </>
  );
}
