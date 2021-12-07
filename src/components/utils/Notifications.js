import React from 'react';
import PropTypes from 'prop-types';

// const Notification = () => (
//   <ToastContainer
//     position="bottom-left"
//     autoClose={5000}
//     hideProgressBar
//     newestOnTop
//     closeOnClick
//     rtl={false}
//     pauseOnFocusLoss
//     draggable={false}
//     pauseOnHover
//   />
// );

const NotificationSuccess = ({ text }) => (
  <div>
    <i className="bi bi-check-circle-fill text-dark mx-2" />
    <span className="text-secondary mx-1">{text}</span>
  </div>
);

const NotificationError = ({ text }) => (
  <div>
    <i className="bi bi-x-circle-fill text-dark mx-2" />
    <span className="text-secondary mx-1">{text}</span>
  </div>
);

const Props = {
  text: PropTypes.string,
};

const DefaultProps = {
  text: '',
};

NotificationSuccess.propTypes = Props;
NotificationSuccess.defaultProps = DefaultProps;

NotificationError.propTypes = Props;
NotificationError.defaultProps = DefaultProps;

export { NotificationSuccess, NotificationError };
