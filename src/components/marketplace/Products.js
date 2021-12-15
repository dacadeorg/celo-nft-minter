import { useContractKit, Contract } from '@celo-tools/use-contractkit';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AddProduct from './AddProduct';
import Product from './Product';
import Loader from '../utils/Loader';

import { NotificationSuccess, NotificationError } from '../utils/Notifications';
import { getProducts as getProductList, buyProduct, createProduct } from '../../utils/marketplace';
import { Row, Toast, ToastContainer } from 'react-bootstrap';

const Products = ({ marketplaceContract, cusdContract, updateBalance }) => {
  const { performActions, address } = useContractKit();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of products from the celo blockchain
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const allProducts = await getProductList(marketplaceContract);
      setProducts(allProducts);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, [marketplaceContract]);

  const addProduct = async (data) => {
    try {
      setLoading(true);
      createProduct(marketplaceContract, performActions, data);
      getProducts();
      //toast(<NotificationSuccess text="Product bought successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a product." />);
      //toast("Failed to create a product.");
    } finally {
      setLoading(false);
    }
  };

  //  function to initiate transaction
  const buy = async (_index, _price) => {
    try {
      await buyProduct(marketplaceContract, cusdContract, performActions, {
        index: _index,
        price: _price,
      });
      updateBalance();
      getProducts();
      //toast("Product bought successfully");
      toast(<NotificationSuccess text="Product bought successfully" />);
    } catch (error) {
      console.log({ error });
      //toast("Failed to purchase product.");
      toast(<NotificationError text="Failed to purchase product." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (address && marketplaceContract) {
        // For testing purpose
        // toast(<NotificationSuccess text="Product added successfully" />);
        getProducts();
        return;
      }
    } catch (error) {
      console.log({ error });
      // toast.error(error);
    }
  }, [marketplaceContract, address, getProducts]);

  if (address) {
    return (
      <>
       
          {!loading ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-4 fw-bold mb-0">Street Food Kigali</h1>
                <AddProduct save={addProduct} />
              </div>
                <Row xs={1} className="g-3  mb-5">
                
                {products.map((_product) => (
                  <Product
                    product={{
                      ..._product,
                    }}
                    buy={buy}
                  />
                ))}
                </Row>
              
            </>
          ) : (
            // display loading component
            <Loader />
          )}
        
      </>
    );
  }
  return null;
};

Products.propTypes = {
  marketplaceContract: PropTypes.instanceOf(Contract).isRequired,
  cusdContract: PropTypes.instanceOf(Contract).isRequired,
  updateBalance: PropTypes.func.isRequired,
};

export default Products;
