import React from "react";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { truncateAddress } from "../../utils/utils";

const Address = ({ address }) => {
  // const changeAccount = () => {};

  if (address) {
    return (
      <>
        <span className="border rounded-pill btn bg-light">
          {truncateAddress(address)}
        </span>
      </>
    );
  }

  return null;
};
export default Address;
