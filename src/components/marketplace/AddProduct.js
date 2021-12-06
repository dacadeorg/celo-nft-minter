import React, { useState } from "react";

const AddProduct = ({ addProduct }) => {
  // do we really need to use state for every single input?
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <>
      {/*Modal*/}
      <div
        className="modal fade"
        id="addModal"
        tabIndex={-1}
        aria-labelledby="newProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newProductModalLabel">
                New Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="form-row">
                  <div className="col">
                    <input
                      type="text"
                      id="newProductName"
                      className="form-control mb-2"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="Enter name of product"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      id="newImgUrl"
                      onChange={(e) => {
                        setImage(e.target.value);
                      }}
                      className="form-control mb-2"
                      placeholder="Enter image url"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      id="newProductDescription"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      className="form-control mb-2"
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      id="newLocation"
                      className="form-control mb-2"
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      id="newPrice"
                      onChange={(e) => {
                        setPrice(Number(e.target.value));
                      }}
                      className="form-control mb-2"
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light border"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
                onClick={() => {
                  addProduct({ name, image, description, location, price });
                }}
                id="newProductBtn"
              >
                Add product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
