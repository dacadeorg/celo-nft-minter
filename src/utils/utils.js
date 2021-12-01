import { ERC20_DECIMALS } from "./constants";
import BigNumber from "bignumber.js";

export const truncateAddress = (address) => {
  return (
    address.slice(0, 5) 
  );
};

export const weiToCusd = (amount) => {
  return (
    new BigNumber(amount).shiftedBy(-ERC20_DECIMALS).toString()
  );
};

export const cusdToWei = (amount) => {
  return (
    new BigNumber(amount).shiftedBy(ERC20_DECIMALS).toString()
  );
};