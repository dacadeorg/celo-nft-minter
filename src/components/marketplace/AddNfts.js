/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel, Card , Alert} from "react-bootstrap";
import {uploadIpfsOnChange} from "../../utils/marketplace";

const AddNfts = ({ save, address }) => {
  // do we really need to use state for every single input?
  const [name, setName] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [description, setDescription] = useState("");

  const isFormFilled = ()=> name && ipfsImage && description

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <> 
      <Button onClick={handleShow}  variant="dark" className="rounded-pill px-0" style={{width:"38px"}}>
        <i class="bi bi-plus"></i>
      </Button>
      
      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/*<FloatingLabel*/}
            {/*  controlId="inputName"*/}
            {/*  // label="Product name"*/}
            {/*  className="mb-3 mt-3"*/}
            {/*>*/}

              <FloatingLabel controlId="inputLocation" label="Name" className="mb-3">
                  <Form.Control type="text" placeholder="Name of NFT"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                  />
              </FloatingLabel>



            <FloatingLabel controlId="inputDescription" label="Description" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: '80px' }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>

              <Form.Control
                  type="file"
                  className={"mb-3"}
                  onChange={async (e) => {
                      const imageUrl =await  uploadIpfsOnChange(e)
                      console.log({imageUrl})
                      if(!imageUrl) {

                          alert("failed to upload image")
                          return
                      }
                      setIpfsImage(imageUrl)
                  }}
                  placeholder="Product name"
              >


              </Form.Control>


            {/*<FloatingLabel controlId="inputPrice" label="Price" className="mb-3">*/}
            {/*  <Form.Control type="text" placeholder="Price" */}
            {/*    onChange={(e) => {*/}
            {/*      setPrice(e.target.value);*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</FloatingLabel>*/}
            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {

              save({
                name,
                ipfsImage,
                description,
                  ownerAddress : address
                // location,
                // price,
              });
              handleClose();
            }}
          >
           Create NFT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddNfts.propTypes = {
  save: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default AddNfts;
