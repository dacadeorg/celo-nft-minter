import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
  );
}

const NotificationSuccess = ({text}) => {
  return (
    <div>
      <i className="bi bi-check-circle-fill text-dark mx-2"></i> 
      <span className="text-secondary mx-1">
        {text}
      </span>
    </div>
  )
}

const NotificationError = ({text}) => {
  return (
    <div>
      <i className="bi bi-x-circle-fill text-dark mx-2"></i> 
      <span className="text-secondary mx-1">
        {text}
      </span>
    </div>
  )
}

export {Notification, NotificationSuccess, NotificationError};
