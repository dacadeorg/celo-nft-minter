import React from "react";
import { ERC20_DECIMALS } from "../../utils/constants";

const Balance = ({ amount, symbol }) => {
  if (amount) {
    return (
      <div>
        {/* move shiftedBy into utils */}
        <span id="balance">
          ${amount.shiftedBy(-ERC20_DECIMALS).toFixed(2)}{" "}
        </span>
        <span className="">{symbol}</span>
      </div>
    );
  }

  return null;
};

export default Balance;
