import { useState, useEffect, useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

export const useBalance = () => {
  const { address, kit } = useContractKit();
  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    const balance = await kit.getTotalBalance(address);
    setBalance(balance);
  }, [address, kit]);
  // look into isMounted from https://usehooks-ts.com/

  useEffect(() => {
    if (address) getBalance();
  }, [address, getBalance]);

  return {
    balance,
    getBalance,
  };
};
