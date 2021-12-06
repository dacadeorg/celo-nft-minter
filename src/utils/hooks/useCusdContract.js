import { useContract } from "./useContract";
import { cUSDContractAddress } from "../constants";
import erc20ABI from "../../contracts/ERC20.abi.json";

export const useCusdContract = () => {
  return useContract(erc20ABI, cUSDContractAddress);
};
