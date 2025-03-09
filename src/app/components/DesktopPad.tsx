import { FaDivide, FaMinus, FaEquals, FaPlus } from "react-icons/fa6";
import { TbMathPi } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { TbSquareRoot } from "react-icons/tb";


const DesktopPad = () => {
  return (
    <div className="grid grid-cols-7 grid-rows-5 gap-2">
      <button className="fx p-1 text-center">Rad</button>
      <button className="fx p-1 text-center">Deg</button>
      <button className="fx p-1 text-center">x!</button>
      <button className="fx p-1 text-center">{"("}</button>
      <button className="fx p-1 text-center">{")"}</button>
      <button className="fx p-1 text-center">%</button>
      <button className="fx p-1 text-center">AC</button>
      <button className="fx p-1 text-center">Inv</button>
      <button className="fx p-1 text-center">sin</button>
      <button className="fx p-1 text-center">ln</button>
      <button className="digit p-1 text-center">7</button>
      <button className="digit p-1 text-center">8</button>
      <button className="digit p-1 text-center">9</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <FaDivide />
      </button>
      <button className=" fx flex items-center justify-center p-1 text-center">
        <TbMathPi />
      </button>
      <button className="fx p-1 text-center">cos</button>
      <button className="fx p-1 text-center">log</button>
      <button className="digit p-1 text-center">4</button>
      <button className="digit p-1 text-center">5</button>
      <button className="digit p-1 text-center">6</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <IoClose />
      </button>
      <button className=" fx p-1 text-center">e</button>
      <button className=" fx p-1 text-center">tan</button>
      <button className=" fx flex items-center justify-center p-1 text-center">
        <TbSquareRoot />
      </button>
      <button className="digit p-1 text-center">1</button>
      <button className="digit p-1 text-center">2</button>
      <button className="digit p-1 text-center">3</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <FaMinus />
      </button>
      <button className="fx p-1 text-center">Ans</button>
      <button className="fx p-1 text-center">EXP</button>
      <button className="fx p-1 text-center">
        x<sup>y</sup>
      </button>
      <button className="digit p-1 text-center">0</button>
      <button className="digit p-1 text-center text">.</button>
      <button className=" equal flex items-center justify-center p-1 text-center">
        <FaEquals />
      </button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <FaPlus />
      </button>
    </div>
  );
};
export default DesktopPad;
