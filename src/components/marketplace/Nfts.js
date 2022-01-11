import { useContractKit, Contract } from '@celo-tools/use-contractkit';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import AddNfts from './AddNfts';
import Nft from './Nft';
import Loader from '../utils/Loader';

import {NotificationSuccess, NotificationError} from '../utils/Notifications';
import { getNfts, createNft, fetchNftContractOwner } from '../../utils/marketplace';
import { Row } from 'react-bootstrap';

const NftList = ({ marketplaceContract, name }) => {
  const { performActions, address } = useContractKit();

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nftOwner, setNftOwner] = useState(null);

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
      await createNft(marketplaceContract, performActions, data);
      toast(<NotificationSuccess text="Updating NFT list...." />);
      // window.location.reload()
      getAssets()
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create an NFT." />);
    } finally {
      setLoading(false);
    }
  };


  const fetchContractOwner = async (marketplaceContract) =>{

    const _address = await fetchNftContractOwner(marketplaceContract)
    console.log({_address})
    setNftOwner(_address)

  }

  useEffect(() => {
    try {
      if (address && marketplaceContract) {
        // For testing purpose
        // toast(<NotificationSuccess text="Product added successfully" />);
        getAssets();
        fetchContractOwner(marketplaceContract)
      }
    } catch (error) {
      console.log({ error });
      // toast.error(error);
    }
  }, [marketplaceContract, address, getNfts]);

  if (address) {

   console.log({nftOwner})
    return (
      <>
       
          {!loading ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-4 fw-bold mb-0">{name}</h1>
                { nftOwner === address ?
                  <AddNfts save={addNft} address={address} /> :null
                }
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
