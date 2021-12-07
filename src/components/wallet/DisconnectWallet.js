import React from "react";
// Import css
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
// use the component from discord
const DisconnectWallet = ({ destroy }) => {
  // const changeAccount = () => {};
  return (
    <Button
      variant="outline-secondary"
      className="rounded-pill"
      onClick={() => {
        destroy();
      }}
    >
      <i className="bi bi-arrows-angle-expand" />
    </Button>
  );
};

DisconnectWallet.propTypes = {
  destroy: PropTypes.func.isRequired,
};

export default DisconnectWallet;
