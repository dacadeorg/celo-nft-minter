import BigNumber from 'bignumber.js';
import React from 'react';
import PropTypes from 'prop-types';
import { weiToCusd } from '../../utils/utils';
// import Identicons from "../utils/Identicon";

const Product = ({ product, buy }) => {
  const {
    price, name, description, sold, location, image, index,
  } = product;

  const triggerBuy = () => {
    const amount = BigNumber(price).toString();
    buy(index, amount);
  };

  return (
    <div className="card col-lg-4 col-md-6 col-xs-12 mb-4" key={index}>
      <img className="card-img-top" src={image} alt="..." />
      {/* <Identicons size={60} address={owner} /> */}
      <div className="position-absolute top-0 end-0 bg-light border mt-4 px-2 py-1 rounded-start">
        {sold}
        {' '}
        Sold
      </div>
      <div className="card-body text-left p-4 position-relative">
        <h2 className="card-title fs-4 fw-bold mt-2">{name}</h2>
        <p className="card-text mb-4" style={{ minHeight: '82px' }}>
          {description}
        </p>
        <p className="card-text mt-4">
          <i className="bi bi-geo-alt-fill" />
          <span>{location}</span>
        </p>
        <div className="d-grid gap-2">
          <button
            type="button"
            className="btn btn-lg btn-outline-dark buyBtn fs-6 p-3"
            onClick={triggerBuy}
          >
            Buy for
            {' '}
            {weiToCusd(price)}
            {' '}
            cUSD
          </button>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;
