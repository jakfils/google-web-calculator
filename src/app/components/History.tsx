"use client";
import { MdHistory } from "react-icons/md";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import classNames from "classnames";

interface HistoryProps {
  isHistoryShown: boolean;
  handleIsHistoryShown: () => void;
  history: {
    id: number;
    expression: string;
    displayedExpression: string;
    result: string | number;
  }[];
  onHistoryItemClick: (value: string) => void;
}

const History: React.FC<HistoryProps> = ({
  isHistoryShown,
  handleIsHistoryShown,
  history,
  onHistoryItemClick,
}) => {
  return isHistoryShown ? (
    <div className="absolute top-0 mt-1 max-h-96 min-h-30 w-5/6 overflow-y-auto rounded-xl bg-[var(--calculator-bg-color)] p-4 sm:max-h-80 sm:w-4/5">
      {/* History panel header */}
      <MdHistory
        className="text-[var(--history-text-color)]"
        onClick={() => {
          handleIsHistoryShown();
        }}
      />
      <div>
        {history.length === 0 ? (
          <p>Your calculations and results appear here for reuse</p>
        ) : (
          <ul className="mt-3">
            {/* List of history items */}
            {history.map((item) => (
              <li key={item.id} className="mb-4">
                {/* Clickable expression */}
                <button
                  onPointerDown={() => {
                    onHistoryItemClick(item.expression);
                  }}
                  className="max-w-[30%] cursor-pointer truncate rounded-md border-1 border-[var(--digit-text-color)] px-3 py-1 text-sm text-[var(--equal-bg-color)] sm:max-w-[50%]"
                >
                  {<Latex>{`$${item.displayedExpression}$`}</Latex>}
                </button>{" "}
                = {/* Clickable result (disabled for errors) */}
                <button
                  onPointerDown={() => {
                    if (item.result !== "Error") {
                      onHistoryItemClick(item.result.toString());
                    }
                  }}
                  className={classNames(
                    "cursor-pointer rounded-md border-1 border-[var(--digit-text-color)] px-3 py-1 text-sm text-[var(--equal-bg-color)]",
                    item.result === "Error" && "cursor-not-allowed opacity-70",
                  )}
                >
                  {item.result}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  ) : null;
};

export default History;
