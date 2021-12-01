import { useContractKit } from "@celo-tools/use-contractkit";
import React, { useEffect, useState, useCallback } from "react";
import AddProduct from "./AddProduct";
import Product from "./Product";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { NotificationBody } from "../utils/Notifications";
import { getProducts as getProductList, buyProduct, createProduct } from "../../utils/marketplace";

const Products = (props) => {
  const { performActions, address } = useContractKit();
  const marketplaceContract = props.marketplaceContract;
  const cusdContract = props.cusdContract;

  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);

  // function to get the list of products from the celo blockchain

  const getProducts = useCallback(
    async () => {
      try {
        setloading(true);
        const allProducts = await getProductList(marketplaceContract);
        setProducts(allProducts);
      } catch (error) {
        console.log({ error });
      } finally {
        setloading(false);
      }
    },
    [marketplaceContract],
  );

  const addProduct = async (data) => {
    try {
      setloading(true);
      createProduct(marketplaceContract, performActions, data);
      getProducts();
      // toast.success("Product added successfully");
    } catch (error) {
      console.log({ error });
      // toast.error("Failed to create a product");
    } finally {
      setloading(false);
    }
  };

  //  function to initiate transaction
  const buy = async (_index, _price) => {
    try {
      await buyProduct(marketplaceContract, cusdContract, performActions, {
        index: _index,
        price: _price,
      });
      props.updateBalance();
      getProducts();
      // toast.success("Product bought successfully");
    } catch (error) {
      console.log({ error });

      // toast.error("Failed to purchase product.");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    try {
      if (address && marketplaceContract) {
        // toast.info("Fetching products...");

        toast(<NotificationBody text="hello 01" />);
        getProducts();
        return;
      }
    } catch (error) {
      console.log({ error });
      // toast.error(error);
    }
  }, [marketplaceContract, address, getProducts]);

  if (props.address) {
    return (
      <>
        <div className="mb-4" style={{ marginTop: "4em" }}>
          <span
            className="btn btn-dark rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
          >
            Add product
          </span>
        </div>
        <main id="marketplace" className="row">
          {!loading ? (
            <>
              <AddProduct addProduct={addProduct} />
              {products.map((_product) => (
                <Product
                  product={{
                    ..._product,
                  }}
                  buyProduct={buy}
                />
              ))}
            </>
          ) : (
            // display loading component
            <Loader />
          )}
        </main>
      </>
    );
  }
  return null;
};
export default Products;
