/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel, Card , Alert} from "react-bootstrap";
import {uploadIpfsOnChange} from "../../utils/minter";

const AddNfts = ({ save, address }) => {
  // do we really need to use state for every single input?
  //  we could use a form like formik and handle the data on submit
  const [name, setName] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [description, setDescription] = useState("");


  const [attributes, setAttributes] = useState([]);

  const isFormFilled = ()=> name && ipfsImage && description && attributes.length > 2

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setAttributes([])
  };
  const handleShow = () => setShow(true);

    const setAttributesFunc = (e, trait_type) => {
        const {value} = e.target
        const attributeObject = {
            trait_type,
            value
        }
// Check if the object already exists and update it
        const arr = attributes
        const index = arr.findIndex((el) => el.trait_type === trait_type)
        if(index >= 0){
          arr[index] = {
            trait_type,
            value
          }
          setAttributes(arr)
          return
        }

        setAttributes(oldArray => [...oldArray, attributeObject]);
        console.log({attributes})
    }

  return (
    <> 
      <Button onClick={handleShow}  variant="dark" className="rounded-pill px-0" style={{width:"38px"}}>
        <i class="bi bi-plus"></i>
      </Button>
      
      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create NFT</Modal.Title>
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
                      if(!imageUrl) {

                          alert("failed to upload image")
                          return
                      }
                      setIpfsImage(imageUrl)
                  }}
                  placeholder="Product name"
              >

              </Form.Control>
              <Form.Label>
                <h5>Properties</h5>
              </Form.Label>
              <Form.Control
                  as="select"
                  className={"mb-3"}
                  onChange={async (e) => {
                      setAttributesFunc(e, "background")
                  }}
                  placeholder="Background"
              >
                  <option >Background</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="cyan">Cyan</option>
                  <option value="yellow">Yellow</option>
                  <option value="magenta">Violet</option>
              </Form.Control>

              <Form.Control
                  as="select"
                  className={"mb-3"}
                  onChange={async (e) => {
                      setAttributesFunc(e, "color")

                  }}
                  placeholder="NFT Color"
              >
                  <option >Color</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="cyan">Cyan</option>
                  <option value="yellow">Yellow</option>
                  <option value="magenta">Violet</option>
          
              </Form.Control>

              <Form.Control
                  as="select"
                  className={"mb-3"}
                  onChange={async (e) => {
                      setAttributesFunc(e, "shape")

                  }}
                  placeholder="NFT Shape"
              >
                 <option >Shape</option>
                 <option value="circle">Circle</option>
                 <option value="square">Square</option>
                 <option value="triangle">Triangle</option>
              </Form.Control>

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
                  ownerAddress : address,
                  attributes
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
