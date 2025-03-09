import { FaEquals } from "react-icons/fa6";
import { TbMathPi } from "react-icons/tb";
import { TbSquareRoot } from "react-icons/tb";

const PhoneFXPad = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-2">
      <button className="fx">Rad</button>
      <button className="fx">Deg</button>
      <button className="fx">x!</button>
      <button className="fx">Inv</button>
      <button className="fx">sin</button>
      <button className="fx">ln</button>
      <button className="fx flex items-center justify-center">
        <TbMathPi />
      </button>
      <button className="fx">cos</button>
      <button className="fx">log</button>
      <button className="fx">e</button>
      <button className="fx">tan</button>
      <button className="fx flex items-center justify-center">
        <TbSquareRoot />
      </button>
      <button className="fx">Ans</button>
      <button className="fx">EXP</button>
      <button className="fx">
        x<sup>y</sup>
      </button>
      <button className="equal flex items-center justify-center">
        <FaEquals />
      </button>
    </div>
  );
};

export default PhoneFXPad;
