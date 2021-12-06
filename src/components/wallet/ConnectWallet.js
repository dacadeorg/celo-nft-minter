// import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
// import { toast } from "react-toastify";

const ConnectWallet = ({connect}) => {

  const triggerConnection = async () => {
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="d-flex justify-content-end mt-3">
      <span
        className="btn border rounded-pill bg-light"
        onClick={triggerConnection}
      >
        <i className="bi bi-arrows-angle-contract m-1"></i>
        <span className="m-1">Connect Wallet</span>
      </span>
    </div>
  );
};

export default ConnectWallet;
