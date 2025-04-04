"use client";
import { useEffect, useRef } from "react";
import { MdHistory } from "react-icons/md";
interface ScreenProps {
  result: number|string;
  expression: string;
  isEqualButton: boolean;
  cursorPosition: number;
}
const Screen: React.FC<ScreenProps> = ({
  result,
  expression,
  isEqualButton,
  cursorPosition,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = cursorPosition;
      inputRef.current.selectionEnd = cursorPosition;
      inputRef.current.focus(); // Garde le focus automatiquement
    }
  }, [cursorPosition, expression]); // Mise à jour à chaque modification
  return (
    <div className="mb-2 rounded-xl border-1 border-[var(--result-area-border-color)] px-4">
      <div>
        <div className="mt-1 flex justify-between">
          <button className="text-[var(--history-text-color)]">
            <MdHistory className="cursor-pointer" />
          </button>
          <div className="text-sm text-[var(--history-text-color)]">answer</div>
        </div>
        <input
          className="mt-3 w-full truncate text-right text-2xl focus:outline-none"
          value={!isEqualButton ? expression : result}
          readOnly
        ></input>
      </div>
    </div>
  );
};
export default Screen;
