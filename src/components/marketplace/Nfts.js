import { useContractKit, Contract } from '@celo-tools/use-contractkit';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AddNfts from './AddNfts';
import Nft from './Nft';
import Loader from '../utils/Loader';

import { NotificationSuccess, NotificationError } from '../utils/Notifications';
import { getNfts, createNft } from '../../utils/marketplace';
import { Row, Toast, ToastContainer } from 'react-bootstrap';

const NftList = ({ marketplaceContract, updateBalance }) => {
  const { performActions, address } = useContractKit();

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  // function to get the list of products from the celo blockchain
  const getAssets = useCallback(async () => {
    try {
      setLoading(true);
      const allNfts = await getNfts(marketplaceContract);

      setNfts(allNfts);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }, [marketplaceContract]);

  const addNft = async (data) => {
    try {
      setLoading(true);
      console.log({data})
      await createNft(marketplaceContract, performActions, data);
      console.log("NFT created!!!")
      // await getNfts(marketplaceContract);
      toast(<NotificationError text="Updating NFT list...." />);
      setTimeout(async () =>{
        await getNfts(marketplaceContract);
      }, 3000);//wait 2 seconds

    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create an NFT." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (address && marketplaceContract) {
        // For testing purpose
        // toast(<NotificationSuccess text="Product added successfully" />);
        getAssets();
      }
    } catch (error) {
      console.log({ error });
      // toast.error(error);
    }
  }, [marketplaceContract, address, getNfts]);

  if (address) {


    return (
      <>
       
          {!loading ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-4 fw-bold mb-0">NFT Marketplace</h1>
                <AddNfts save={addNft} address={address} />
              </div>
                <Row xs={1} sm={2} lg={3}  className="g-3  mb-5 g-xl-4 g-xxl-5">
                
                {nfts.map((_nft) => (
                  <Nft
                    nft={{
                      ..._nft,
                    }}
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

NftList.propTypes = {
  marketplaceContract: PropTypes.instanceOf(Contract).isRequired,
  updateBalance: PropTypes.func.isRequired
};

export default NftList;
