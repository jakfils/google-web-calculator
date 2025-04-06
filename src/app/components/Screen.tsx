"use client";
import { useEffect, useRef } from "react";
import { MdHistory } from "react-icons/md";
interface ScreenProps {
  result: number | string;
  expression: string;
  isEqualButton: boolean;
  cursorPosition: number;
  displayedExpession: string;
}
const Screen: React.FC<ScreenProps> = ({
  result,
  isEqualButton,
  displayedExpession,
}) => {
  return (
    <div className="mb-2 rounded-xl border-1 border-[var(--result-area-border-color)] px-4">
      <div>
        <div className="mt-1 flex justify-between">
          <button className="text-[var(--history-text-color)]">
            <MdHistory className="cursor-pointer" />
          </button>
          <div className="text-sm text-[var(--history-text-color)]">answer</div>
        </div>
        <div className="mt-3 w-full truncate text-right text-2xl">
          {!isEqualButton ? displayedExpession : result}
        </div>
      </div>
    </div>
  );
};
export default Screen;
