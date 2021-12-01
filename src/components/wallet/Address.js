import React from "react";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { truncateAddress } from "../../utils/utils";

const Address = (props) => {
  // const changeAccount = () => {};

  if (props.address) {
    return (
      <>
        <span
          class="border rounded-pill btn bg-light"
        >
          {truncateAddress(props.address)}
        </span>
      </>
    );
  }

  return null;
};
export default Address;
