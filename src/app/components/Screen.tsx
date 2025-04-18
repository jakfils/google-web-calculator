"use client";
import { MdHistory } from "react-icons/md";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

interface ScreenProps {
  result: number | string;
  expression: string;
  isEqualButton: boolean;
  cursorPosition: number;
  displayedExpression: string;
  handleIsHistoryShown: () => void;
  history: {
    id: number;
    expression: string;
    displayedExpression: string;
    result: string | number;
  }[];
}

const Screen: React.FC<ScreenProps> = ({
  result,
  isEqualButton,
  displayedExpression,
  handleIsHistoryShown,
  history,
}) => {
  // Determine what to display based on equals button state
  const exp = !isEqualButton ? `$${displayedExpression}$` : `$${result}$`;

  return (
    <div className="mb-2 rounded-xl border-1 border-[var(--result-area-border-color)] px-4">
      <div>
        <div className="mt-1 flex justify-between py-2">
          {/* History toggle button */}
          <button className="py-1 text-[var(--history-text-color)]">
            <MdHistory
              className="cursor-pointer"
              onClick={() => {
                handleIsHistoryShown();
              }}
            />
          </button>
          {/* Previous calculation display */}
          <div className="text-sm text-[var(--history-text-color)]">
            {isEqualButton
              ? history.length > 0 && (
                  <Latex>
                    {`$${history[history.length - 1].displayedExpression}$`}
                    {" ="}
                  </Latex>
                )
              : history.length > 0 && (
                  <Latex>
                    {"Ans = "}
                    {`$${history[history.length - 1].result}$`}
                  </Latex>
                )}
          </div>
        </div>
        {/* Main display area with LaTeX rendering */}
        <div className="w-full truncate text-right text-xl font-bold">
          <Latex>{exp}</Latex>
        </div>
      </div>
    </div>
  );
};

export default Screen;
