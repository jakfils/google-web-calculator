import { MdHistory } from "react-icons/md";
const Screen = () => {
  return (
    <div className="mb-2 rounded-xl border-1 border-[var(--result-area-border-color)] px-4">
      <div>
        <div className="mt-1 flex justify-between">
          <button className="text-[var(--history-text-color)]">
            <MdHistory className="cursor-pointer" />
          </button>
          <div className="text-sm text-[var(--history-text-color)]">answer</div>
        </div>
        <div className="flex justify-end text-2xl">0</div>
      </div>
    </div>
  );
};
export default Screen;
