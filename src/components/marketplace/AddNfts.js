/* eslint-disable react/jsx-filename-extension */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel, Card , Alert} from "react-bootstrap";
import {uploadIpfsOnChange} from "../../utils/marketplace";

const AddNfts = ({ save, address }) => {
  // do we really need to use state for every single input?
  //  we could use a form like formik and handle the data on submit
  const [name, setName] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [description, setDescription] = useState("");


  const [attributes, setAttributes] = useState([]);
  // const [color, setColor] = useState("");
  // const [shape, setShape] = useState("");

  const isFormFilled = ()=> name && ipfsImage && description && attributes.length > 2

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const colorOptions = () => {
      return (
          <>          <option value="brown">Brown</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="orange">Orange</option>
              <option value="indigo">Indigo</option>
              <option value="violet">Violet</option>
              <option value="gold">Gold</option>
              <option value="pink">Pink</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
          </>

      )
  }

    const shapeOptions = () => {
        return (
            <>          <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="rectangle">Rectangle</option>
                <option value="triangle">Triangle</option>

            </>

        )
    }

    const setAttributesFunc = (e, trait_type) => {
        const {value} = e.target
        const attributeObject = {
            trait_type,
            value
        }

        const attributeArray = [...attributes].push(attributeObject)
        console.log({attributeArray})
        setAttributes(attributeArray)
    }

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
                      if(!imageUrl) {

                          alert("failed to upload image")
                          return
                      }
                      setIpfsImage(imageUrl)
                  }}
                  placeholder="Product name"
              >

              </Form.Control>


              <Form.Control
                  as="select"
                  className={"mb-3"}
                  onChange={async (e) => {
                      setAttributesFunc(e, "background")



                  }}
                  placeholder="Background Color"
              >
                  <colorOptions />


              </Form.Control>


              <Form.Control
                  as="select"
                  className={"mb-3"}
                  onChange={async (e) => {
                      setAttributesFunc(e, "color")

                  }}
                  placeholder="NFT Color"
              >

                  <colorOptions />

              </Form.Control>


              <Form.Control
                  as="select"
                  className={"mb-3"}
                  onChange={async (e) => {
                      setAttributesFunc(e, "shape")

                  }}
                  placeholder="NFT Shape"
              >
            <shapeOptions />

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
