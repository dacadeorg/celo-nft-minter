import { useContract } from './useContract';
import { marketplaceContractAddress } from '../constants';
import MarketPlaceAbi from '../../contracts/NftMarketplace.abi.json';

export const useMarketplaceContract = () => useContract(MarketPlaceAbi, marketplaceContractAddress);
