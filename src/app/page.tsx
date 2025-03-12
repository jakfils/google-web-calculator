"use client";
import { useState } from "react";
import Screen from "./components/Screen";
import DigitPad from "./components/DigitPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
export default function Home() {
  const [isFxActive, setIsFxActive] = useState(false);
  const handleFx = (value: string) => {
    setIsFxActive(value === "fx");
  };
  return (
    <>
      <main className="m-2 w-full rounded-sm bg-[var(--calculator-bg-color)] p-1 sm:w-4/5 md:w-3/4 lg:w-[640px]">
        <div>
          <Screen />
        </div>
        <div>
          <DigitPad isFxActive={isFxActive} />
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
