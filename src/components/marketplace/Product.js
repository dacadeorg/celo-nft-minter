import BigNumber from "bignumber.js";
import React from "react";
import PropTypes from "prop-types";
import { weiToCusd } from "../../utils/utils";
import { Card, Button, Col, Badge } from "react-bootstrap";
// import Identicons from "../utils/Identicon";

const Product = ({ product, buy }) => {
  const { price, name, description, sold, location, image, index } = product;

  const triggerBuy = () => {
    const amount = BigNumber(price).toString();
    buy(index, amount);
  };

  return (
    <Col lg={4} md={6} xs={12} className="mb-4" key={index}>
      <Card style={{height: '100%'}}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            <Badge
              bg="light"
              text="dark"
              className="position-absolute top-0 end-0 border mt-4 rounded-start"
            >
              {sold} Sold
            </Badge>
          </Card.Text>
          <Card.Text>
            <i className="bi bi-geo-alt-fill" />
            <span>{location}</span>
          </Card.Text>
          <Button variant="outline-dark" onClick={triggerBuy}>
            Buy for {weiToCusd(price)} cUSD
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Product.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Product;
