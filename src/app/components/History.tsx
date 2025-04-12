"use client";
import { MdHistory } from "react-icons/md";
interface HistoryProps {
  isHistoryShown: boolean;
  handleIsHistoryShown: () => void;
}
const History: React.FC<HistoryProps> = ({
  isHistoryShown,
  handleIsHistoryShown,
}) => {
  return isHistoryShown ? (
    <div className="absolute top-0 mt-1 max-h-96 min-h-30 w-5/6 overflow-y-auto rounded-xl bg-[var(--calculator-bg-color)] p-4 sm:max-h-80 sm:w-4/5">
      <MdHistory
        onClick={() => {
          handleIsHistoryShown();
        }}
      />
      <h1>History</h1>
      <p></p>
    </div>
  ) : null;
};

export default History;
