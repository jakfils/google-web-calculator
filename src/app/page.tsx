"use client";
import { useState } from "react";
import Screen from "./components/Screen";
import DesktopPad from "./components/DesktopPad";
import PhoneDigitPad from "./components/PhoneDigitPad";
import PhoneFXPad from "./components/PhoneFXPad";
import DigitFxSwitcher from "./components/DigitFxSwitcher";
export default function Home() {
  const [isFxActive, setIsFxActive] = useState(false);
  const handleFx = (value: string) => {
    setIsFxActive(value === "fx");
  };
  return (
    <>
      <main className="m-2 w-5/6 rounded-sm bg-[var(--calculator-bg-color)] p-1 sm:w-4/5 md:w-3/4 lg:w-[640px]">
        <div>
          <Screen />
        </div>
        <div className="hidden sm:block">
          <DesktopPad />
        </div>
        <div className="sm:hidden">
          {!isFxActive ? (
            <div>
              <PhoneDigitPad />
            </div>
          ) : null}
          {isFxActive ? (
            <div>
              <PhoneFXPad />
            </div>
          ) : null}
        </div>
        <DigitFxSwitcher isFxActive={isFxActive} handleFx={handleFx} />
      </main>
    </>
  );
}
