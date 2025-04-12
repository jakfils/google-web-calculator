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
}
const Screen: React.FC<ScreenProps> = ({
  result,
  isEqualButton,
  displayedExpression,
  handleIsHistoryShown,
}) => {
  const exp = !isEqualButton ? `$${displayedExpression}$` : `$${result}$`;
  return (
    <div className="mb-2 rounded-xl border-1 border-[var(--result-area-border-color)] px-4">
      <div>
        <div className="mt-1 flex justify-between">
          <button className="text-[var(--history-text-color)]">
            <MdHistory
              className="cursor-pointer"
              onClick={() => {
                handleIsHistoryShown();
              }}
            />
          </button>
          <div className="text-sm text-[var(--history-text-color)]">answer</div>
        </div>
        <div className="mt-3 w-full truncate text-right text-xl font-bold">
          <Latex>{exp}</Latex>
        </div>
      </div>
    </div>
  );
};
export default Screen;
