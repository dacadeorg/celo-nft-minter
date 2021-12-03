import React from "react";

const Cover = (props) => {
  // const changeAccount = () => {};

  if (props.name) {
    return (
      <div className="d-flex vh-80 bg-success cover justify-content-center mt-3">
        <div className="d-flex align-items-center m-4">
          <div className="flex-column text-white">
            <div className="m-0 h1 fw-bold">
              {props.name}
            </div>
            <div>
              <span className="m-0 text-white-50">
                powered by Celo
                {/* <img 
                  src="https://celo.org/images/marketplace-icons/icon-celo-CELO-reverse-f.svg" 
                  alt="Celo" 
                  width="25" 
                  height="25"
                  className="m-0 text-white-50"
                /> */}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
export default Cover;
