import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css


// use the component from discord
const Disconnect = ({destroy}) => {
  // const changeAccount = () => {};

  const logout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui card m-2'>
            <div className="card-body m-2">
              <h5 className="card-title">Disconnect</h5>
              <p className="card-text">Are you sure you want to disconnect your wallet?</p>
              <div className="d-flex justify-content-end ">
                <button className="btn fw-bold" onClick={onClose}>CANCLE</button>
                <button
                  className="btn fw-bold"
                  onClick={() => {
                    destroy();
                    onClose();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
  };
  return (
    <>
      <span
        className="border rounded-pill btn bg-light"
        onClick={logout}
      >
        <i className="bi bi-arrows-angle-expand"></i>
      </span>
    </>
  );
};
export default Disconnect;
