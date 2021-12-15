import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import Wallet from "./components/wallet/Wallet";
import { Notification } from './components/utils/Notifications';
import Products from "./components/marketplace/Products";


import {
  useBalance,
  useMarketplaceContract,
  useCusdContract,
} from "./utils/hooks";
import { Container, Nav , Button, Alert} from "react-bootstrap";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const marketplaceContract = useMarketplaceContract();
  const cusdContract = useCusdContract();

  return (
    <>
      <Notification />
      <Container style={{maxWidth:"400px"}}>
        {address ? (
          <> 
            <Nav className="justify-content-end pt-3 pb-5">
              <Nav.Item>
                <Wallet address={address} amount={balance.cUSD} symbol="cUSD" destroy={destroy}/>
              </Nav.Item>
            </Nav>
            <main>
              <Products
                address={address}
                updateBalance={getBalance}
                marketplaceContract={marketplaceContract}
                cusdContract={cusdContract}
              />
            </main>
          </>
        ) : (  
          <div className="d-flex justify-content-center flex-column text-center vh-100">
           <Alert  variant="warning" className="mt-auto">
              <Alert.Heading>Street Food Kigali</Alert.Heading>
              <p>
              Please connect your wallet to continue.
              </p>  
              <div className="d-flex justify-content-center mt-5">
                <Button onClick={connect} variant="warning" className="rounded-pill px-3">
                  Connect Wallet
                </Button>
              </div>
            </Alert>
            <p className="mt-auto">Powered by Celo</p>      
          </div>
          
        )}
      </Container>
    </>
  );
};

export default App;
