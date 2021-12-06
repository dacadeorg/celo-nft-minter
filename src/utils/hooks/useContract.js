import { useState, useEffect, useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

export const useContract = (abi, contractAddress) => {
  const { getConnectedKit, address } = useContractKit();
  const [contract, setContract] = useState(0);

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();

    const contract = new kit.web3.eth.Contract(abi, contractAddress);

    setContract(contract);
  }, [getConnectedKit, abi, contractAddress]);

  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return contract;
};
