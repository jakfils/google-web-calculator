import { FaDivide, FaMinus, FaPlus, FaEquals } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
const PhoneDigitPad = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2">
      <button className="fx p-1 text-center">{"("}</button>
      <button className="fx p-1 text-center">{")"}</button>
      <button className="fx p-1 text-center">%</button>
      <button className="fx p-1 text-center">AC</button>
      <button className="digit p-1 text-center">7</button>
      <button className="digit p-1 text-center">8</button>
      <button className="digit p-1 text-center">9</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <FaDivide />
      </button>
      <button className="digit p-1 text-center">4</button>
      <button className="digit p-1 text-center">5</button>
      <button className="digit p-1 text-center">6</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <IoClose />
      </button>
      <button className="digit p-1 text-center">1</button>
      <button className="digit p-1 text-center">2</button>
      <button className="digit p-1 text-center">3</button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <FaMinus />
      </button>
      <button className="digit p-1 text-center">0</button>
      <button className="digit text p-1 text-center">.</button>
      <button className="equal flex items-center justify-center p-1 text-center">
        <FaEquals />
      </button>
      <button className="fx flex items-center justify-center p-1 text-center">
        <FaPlus />
      </button>
    </div>
  );
};

export default PhoneDigitPad;
