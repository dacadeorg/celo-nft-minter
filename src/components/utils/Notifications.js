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

const NotificationBody = ({text}) => {
  return (
    <div>
      <div class="toast-body">
        {text}
      </div>
    </div>
  )
}

export {Notification, NotificationBody};
