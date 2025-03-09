import { FaDivide, FaMinus, FaPlus, FaEquals } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
const PhoneDigitPad = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2">
      <button className="fx">{"("}</button>
      <button className="fx">{")"}</button>
      <button className="fx">%</button>
      <button className="fx">AC</button>
      <button className="digit">7</button>
      <button className="digit">8</button>
      <button className="digit">9</button>
      <button className="fx flex items-center justify-center">
        <FaDivide />
      </button>
      <button className="digit">4</button>
      <button className="digit">5</button>
      <button className="digit">6</button>
      <button className="fx flex items-center justify-center">
        <IoClose />
      </button>
      <button className="digit">1</button>
      <button className="digit">2</button>
      <button className="digit">3</button>
      <button className="fx flex items-center justify-center">
        <FaMinus />
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

export default PhoneDigitPad;
