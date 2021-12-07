import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";

import { useContractKit } from "@celo-tools/use-contractkit";

import React from "react";

import Address from "./components/wallet/Address";
import Balance from "./components/wallet/Balance";
import ConnectWallet from "./components/wallet/ConnectWallet";
import Disconnect from "./components/wallet/DisconnectWallet";

// import { Notification } from './components/utils/Notifications';
import Products from "./components/marketplace/Products";
import Cover from "./components/marketplace/Cover";

import {
  useBalance,
  useMarketplaceContract,
  useCusdContract,
} from "./utils/hooks";
import { Container, Nav } from "react-bootstrap";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const marketplaceContract = useMarketplaceContract();
  const cusdContract = useCusdContract();

  return (
    <>
      {/* <Notification /> */}
      <Container style={{ maxWidth: "72em" }}>
        {address ? (
          <>
            <Nav className="justify-content-between pt-3 pb-5">
              <Nav.Item>
                <Address address={address} />
              </Nav.Item>
              <Nav.Item>
                <Balance amount={balance.cUSD} symbol="cUSD" />
              </Nav.Item>
              <Nav.Item>
                <Disconnect destroy={destroy} />
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
          <>
            <ConnectWallet connect={connect} />
            <main>
              <Cover name="Street Food Kigali" />
            </main>
          </>
        )}
      </Container>
    </>
  );
};

export default App;
