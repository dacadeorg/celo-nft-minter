import BigNumber from 'bignumber.js';
import { ERC20_DECIMALS } from './constants';

export const truncateAddress = (address) => address.slice(0, 6);//`${address.slice(0, 6)}…${address.slice(-6)}`;

export const weiToCusd = (amount) => new BigNumber(amount).shiftedBy(-ERC20_DECIMALS).toString();

export const cusdToWei = (amount) => new BigNumber(amount).shiftedBy(ERC20_DECIMALS).toString();
