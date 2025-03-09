import { FaDivide, FaMinus, FaEquals, FaPlus } from "react-icons/fa6";
import { TbMathPi } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { TbSquareRoot } from "react-icons/tb";

const DesktopPad = () => {
  return (
    <div className="grid grid-cols-7 grid-rows-5 gap-2">
      <button className="fx">Rad</button>
      <button className="fx">Deg</button>
      <button className="fx">x!</button>
      <button className="fx">{"("}</button>
      <button className="fx">{")"}</button>
      <button className="fx">%</button>
      <button className="fx">AC</button>
      <button className="fx">Inv</button>
      <button className="fx">sin</button>
      <button className="fx">ln</button>
      <button className="digit">7</button>
      <button className="digit">8</button>
      <button className="digit">9</button>
      <button className="fx flex items-center justify-center">
        <FaDivide />
      </button>
      <button className="fx flex items-center justify-center">
        <TbMathPi />
      </button>
      <button className="fx">cos</button>
      <button className="fx">log</button>
      <button className="digit">4</button>
      <button className="digit">5</button>
      <button className="digit">6</button>
      <button className="fx flex items-center justify-center">
        <IoClose />
      </button>
      <button className="fx">e</button>
      <button className="fx">tan</button>
      <button className="fx flex items-center justify-center">
        <TbSquareRoot />
      </button>
      <button className="digit">1</button>
      <button className="digit">2</button>
      <button className="digit">3</button>
      <button className="fx flex items-center justify-center">
        <FaMinus />
      </button>
      <button className="fx">Ans</button>
      <button className="fx">EXP</button>
      <button className="fx">
        x<sup>y</sup>
      </button>
      <button className="digit">0</button>
      <button className="digit text">.</button>
      <button className="equal flex items-center justify-center">
        <FaEquals />
      </button>
      <button className="fx flex items-center justify-center">
        <FaPlus />
      </button>
    </div>
  );
};
export default DesktopPad;
