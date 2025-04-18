interface DigitFxSwitcherProps {
  isFxActive: boolean;
  handleFx: (value: string) => void;
}

const DigitFxSwitcher: React.FC<DigitFxSwitcherProps> = ({
  isFxActive,
  handleFx,
}) => {
  return (
    <div className="text-md mt-5 flex sm:hidden">
      {/* Toggle between digits and functions on mobile */}
      <button
        className={`cursor-pointer rounded-l-full border-y border-l border-[var(--digit-bg-color)] px-8 py-2 ${!isFxActive ? "bg-[var(--digit-bg-color)]" : "bg-[var(--calculaor-bg-color)]"}`}
        onClick={() => {
          handleFx("123");
        }}
      >
        123
      </button>
      <button
        className={`cursor-pointer rounded-r-full border-y border-r border-[var(--digit-bg-color)] px-8 py-2 ${isFxActive ? "bg-[var(--digit-bg-color)]" : "bg-[var(--calculator-bg-color)]"}`}
        onClick={() => {
          handleFx("fx");
        }}
      >
        FX
      </button>
    </div>
  );
};

export default DigitFxSwitcher;
