import React from "react";
import PropTypes from "prop-types";
import { ERC20_DECIMALS } from "../../utils/constants";

const Balance = ({ amount, symbol }) => {
  if (amount) {
    return (
      <div>
        {/* move shiftedBy into utils */}
        <span id="balance">
          ${amount.shiftedBy(-ERC20_DECIMALS).toFixed(2)}
        </span>
        <span className="">{symbol}</span>
      </div>
    );
  }

  return null;
};

Balance.propTypes = {
  symbol: PropTypes.string,
  amount: PropTypes.number,
};

Balance.defaultProps = {
  amount: 0,
  symbol: "",
};

export default Balance;
