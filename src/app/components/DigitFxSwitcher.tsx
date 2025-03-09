interface DigitFxSwitcherProps {
  isFxActive: boolean;
  handleFx: (value: string) => void;
}
const DigitFxSwitcher: React.FC<DigitFxSwitcherProps> = ({
  isFxActive,
  handleFx,
}) => {
  return (
    <div className="mt-5 flex  text-md sm:hidden">
      <button
        className={`cursor-pointer rounded-l-2xl border-y border-l border-[var(--digit-bg-color)] px-4 ${!isFxActive ? "bg-[var(--digit-bg-color)]" : "bg-[var(--calculaor-bg-color)]"}`}
        onClick={() => {
          handleFx("123");
        }}
      >
        123
      </button>
      <button
        className={`cursor-pointer rounded-r-2xl border-y border-r border-[var(--digit-bg-color)] px-4 ${isFxActive ? "bg-[var(--digit-bg-color)]" : "bg-[var(--calculaor-bg-color)]"}`}
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
