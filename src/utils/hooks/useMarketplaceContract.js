import { useContract } from './useContract';
import MyNFTAbi from '../../contracts/MyNFT.json';
import MyNFTContractAddress from '../../contracts/MyNFT-address.json';

export const useMarketplaceContract = () => useContract(MyNFTAbi.abi, MyNFTContractAddress.MyNFT);
