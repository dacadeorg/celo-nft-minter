import BigNumber from "bignumber.js";
import React from "react";
import PropTypes from "prop-types";
import { weiToCusd } from "../../utils/utils";
import { Card, Button, Col, Badge, Stack} from "react-bootstrap";
import { truncateAddress } from '../../utils/utils';
import Identicon from '../utils/Identicon'

const Nft = ({ nft, buy }) => {
  const {  image, description, owner, name, index } = nft;


  return (
    <Col key={index}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>

            <Identicon address={owner} size={28} />
            <span className="font-monospace text-secondary">{truncateAddress(owner)}</span>
            <Badge bg="secondary"
              className="ms-auto">
              {index} ID
            </Badge>
          </Stack> 
        </Card.Header>
        <div className=" ratio ratio-4x3"> 
            <img  src={image} alt={description} style={{objectFit: 'cover'}}/>
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>


        </Card.Body>
                
      </Card>
    </Col>
  );
};

Nft.propTypes = {
  nft: PropTypes.instanceOf(Object).isRequired
};

export default Nft;
