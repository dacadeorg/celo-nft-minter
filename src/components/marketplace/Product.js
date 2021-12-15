import BigNumber from "bignumber.js";
import React from "react";
import PropTypes from "prop-types";
import { weiToCusd } from "../../utils/utils";
import { Card, Button, Col, Badge, Stack} from "react-bootstrap";
import { truncateAddress } from '../../utils/utils';
import Identicon from '../utils/Identicon'
// import Identicons from "../utils/Identicon";

const Product = ({ product, buy }) => {
  const { price, name, description, sold, location, image, index, owner } = product;

  const triggerBuy = () => {
    const amount = BigNumber(price).toString();
    buy(index, amount);
  };

  return (
    <Col key={index}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>

            <Identicon address={owner} size={28} />
            <span className="font-monospace text-secondary">{truncateAddress(owner)}</span>
            <Badge bg="secondary"
              className="ms-auto">
              {sold} Sold
            </Badge>
          </Stack> 
        </Card.Header>
        <div className=" ratio ratio-4x3"> 
            <img  src={image} alt={name} style={{objectFit: 'cover'}}/>     
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            {//<i className="bi bi-geo-alt-fill me-1" />
            }
            <span>{location}</span>
          </Card.Text >
          
          <Button variant="outline-dark" onClick={triggerBuy} className="w-100 py-3">
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
