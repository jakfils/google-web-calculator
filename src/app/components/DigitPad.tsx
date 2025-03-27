import classNames from "classnames";
import { FaDivide, FaMinus, FaEquals, FaPlus } from "react-icons/fa6";
import { TbMathPi } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { TbSquareRoot, TbSquareRoot2 } from "react-icons/tb";
import { useState } from "react";
interface DigitPadProps {
  isFxActive: boolean;
  expression: string;
  result: number | string;
  handleResult: () => void;
  isEqualButton: boolean;
  handleIsEqualButton: (value: string) => void;
  onInsert: (value: string, offset?: number) => void;
  resetExpression: () => void;
}

const DigitPad: React.FC<DigitPadProps> = ({
  isFxActive,
  expression,
  result,
  handleResult,
  isEqualButton,
  handleIsEqualButton,
  onInsert,
  resetExpression,
}) => {
  const [isInvActive, setIsInvActive] = useState(false);
  const handleInv = () => {
    setIsInvActive(!isInvActive);
  };
  const phoneDigitClass = classNames(
    { hidden: isFxActive },
    { "sm:flex": true },
  );
  const phoneFxClass = classNames(
    { hidden: !isFxActive, flex: isFxActive },
    { "sm:flex": true },
  );

  const phoneNoInvClass = classNames(
    { hidden: (isFxActive && isInvActive) || !isFxActive },
    { "sm:flex": !isInvActive, "sm:hidden": isInvActive },
  );
  const phoneInvClass = classNames(
    {
      hidden: !isInvActive || !isFxActive,
      flex: isFxActive && isInvActive,
    },
    { "sm:hidden": !isInvActive, "sm:flex": isInvActive },
  );

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 sm:grid-cols-7">
      <button className={classNames("fx", phoneDigitClass)}>{"("}</button>
      <button className={classNames("fx", phoneDigitClass)}>{")"}</button>
      <button
        onClick={() => {
          onInsert("%", 1);
        }}
        className={classNames("fx", phoneDigitClass)}
      >
        %
      </button>
      <button
        onClick={() => {
          handleIsEqualButton("non");
        }}
        className={classNames("fx", phoneDigitClass)}
      >
        AC
      </button>
      <button
        onClick={() => {
          onInsert("7", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        7
      </button>
      <button
        onClick={() => {
          onInsert("8", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        8
      </button>
      <button
        onClick={() => {
          onInsert("9", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        9
      </button>
      <button
        onClick={() => {
          onInsert("/", 1);
        }}
        className={classNames("fx", phoneDigitClass)}
      >
        <FaDivide />
      </button>
      <button
        onClick={() => {
          onInsert("4", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        4
      </button>
      <button
        onClick={() => {
          onInsert("5", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        5
      </button>
      <button
        onClick={() => {
          onInsert("6", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        6
      </button>
      <button
        onClick={() => {
          onInsert("*", 1);
        }}
        className={classNames("fx", phoneDigitClass)}
      >
        <IoClose />
      </button>
      <button
        onClick={() => {
          onInsert("1", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        1
      </button>
      <button
        onClick={() => {
          onInsert("2", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        2
      </button>
      <button
        onClick={() => {
          onInsert("3", 1);
        }}
        className={classNames("digit", phoneDigitClass)}
      >
        3
      </button>
      <button
        onClick={() => {
          onInsert("-", 1);
        }}
        className={classNames("fx", phoneDigitClass)}
      >
        <FaMinus />
      </button>
      <button
        onClick={() => onInsert("0", 1)}
        className={classNames("digit", phoneDigitClass)}
      >
        0
      </button>
      <button
        onClick={() => onInsert(".", 1)}
        className={classNames("digit", phoneDigitClass)}
      >
        .
      </button>
      <button
        onClick={() => {
          if (!isEqualButton) {
            resetExpression();
            handleIsEqualButton("equal");
            handleResult();
          }
        }}
        className={classNames("equal", {
          "col-start-4 row-start-4": isFxActive,
        })}
      >
        <FaEquals />
      </button>
      <button
        onClick={() => {
          onInsert("+", 1);
        }}
        className={classNames("fx", phoneDigitClass)}
      >
        <FaPlus />
      </button>
      <button
        className={classNames(
          "fx -mr-1 rounded-r-none sm:col-start-1 sm:row-start-1",
          phoneFxClass,
        )}
      >
        Rad
      </button>
      <button
        className={classNames(
          "fx -ml-1 rounded-l-none border-l-2 border-[var(--rad-deg-active-text-color)] sm:col-start-2 sm:row-start-1",
          phoneFxClass,
        )}
      >
        Deg
      </button>
      <button
        className={classNames("fx sm:col-start-3 sm:row-start-1", phoneFxClass)}
      >
        x!
      </button>
      <button
        className={classNames("fx sm:col-start-1 sm:row-start-2", phoneFxClass)}
        onClick={handleInv}
      >
        Inv
      </button>
      <button
        className={classNames(
          "fx sm:col-start-2 sm:row-start-2",
          phoneNoInvClass,
        )}
      >
        sin
      </button>
      <button
        className={classNames(
          "fx sm:col-start-2 sm:row-start-2",
          phoneInvClass,
        )}
      >
        sin<sup>-1</sup>
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-2",
          phoneNoInvClass,
        )}
      >
        ln
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-2",
          phoneInvClass,
        )}
      >
        e<sup>x</sup>
      </button>
      <button
        onClick={() => {
          onInsert("pi", 2);
        }}
        className={classNames("fx sm:col-start-1 sm:row-start-3", phoneFxClass)}
      >
        <TbMathPi />
      </button>
      <button
        onClick={() => {
          onInsert("cos()", 4);
        }}
        className={classNames(
          "fx sm:col-start-2 sm:row-start-3",
          phoneNoInvClass,
        )}
      >
        cos
      </button>
      <button
        className={classNames(
          "fx sm:col-start-2 sm:row-start-3",
          phoneInvClass,
        )}
      >
        cos<sup>-1</sup>
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-3",
          phoneNoInvClass,
        )}
      >
        log
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-3",
          phoneInvClass,
        )}
      >
        10<sup>x</sup>
      </button>
      <button
        className={classNames("fx sm:col-start-1 sm:row-start-4", phoneFxClass)}
      >
        e
      </button>
      <button
        className={classNames(
          "fx sm:col-start-2 sm:row-start-4",
          phoneNoInvClass,
        )}
      >
        tan
      </button>
      <button
        className={classNames(
          "fx sm:col-start-2 sm:row-start-4",
          phoneInvClass,
        )}
      >
        tan<sup>-1</sup>
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-4",
          phoneNoInvClass,
        )}
      >
        <TbSquareRoot />
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-4",
          phoneInvClass,
        )}
      >
        x<sup>2</sup>
      </button>
      <button
        className={classNames(
          "fx sm:col-start-1 sm:row-start-5",
          phoneNoInvClass,
        )}
      >
        Ans
      </button>
      <button
        className={classNames(
          "fx sm:col-start-1 sm:row-start-5",
          phoneInvClass,
        )}
      >
        Rnd
      </button>
      <button
        className={classNames("fx sm:col-start-2 sm:row-start-5", phoneFxClass)}
      >
        EXP
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-5",
          phoneNoInvClass,
        )}
      >
        x<sup>y</sup>
      </button>
      <button
        className={classNames(
          "fx sm:col-start-3 sm:row-start-5",
          phoneInvClass,
        )}
      >
        <sup>y</sup>
        <TbSquareRoot2 />
      </button>
    </div>
  );
};
export default DigitPad;
