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
            <div class="card-body m-2">
              <h5 class="card-title">Disconnect</h5>
              <p class="card-text">Are you sure you want to disconnect your wallet?</p>
              <div class="d-flex justify-content-end ">
                <button class="btn fw-bold" onClick={onClose}>CANCLE</button>
                <button
                  class="btn fw-bold"
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
        <i class="bi bi-arrows-angle-expand"></i>
      </span>
    </>
  );
};
export default Disconnect;
