import { FaEquals } from "react-icons/fa6";
import { TbMathPi } from "react-icons/tb";
import { TbSquareRoot } from "react-icons/tb";

const PhoneFXPad = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-2">
      <button className="fx p-1 text-center">Rad</button>
      <button className="fx p-1 text-center">Deg</button>
      <button className="fx p-1 text-center">x!</button>
      <button className="fx p-1 text-center">Inv</button>
      <button className="fx p-1 text-center">sin</button>
      <button className="fx p-1 text-center">ln</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <TbMathPi />
      </button>
      <button className="fx p-1 text-center">cos</button>
      <button className="fx p-1 text-center">log</button>
      <button className="fx p-1 text-center">e</button>
      <button className="fx p-1 text-center">tan</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <TbSquareRoot />
      </button>
      <button className="fx p-1 text-center">Ans</button>
      <button className="fx p-1 text-center">EXP</button>
      <button className="fx p-1 text-center">
        x<sup>y</sup>
      </button>
      <button className="equal flex items-center justify-center p-1 text-center">
        <FaEquals />
      </button>
    </div>
  );
};

export default PhoneFXPad;
