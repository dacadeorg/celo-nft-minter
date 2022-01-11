import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import Wallet from "./components/wallet/Wallet";
import { Notification } from "./components/utils/Notifications";
import { Cover } from "./components/utils/Cover";
import Nfts from "./components/marketplace/Nfts";
import coverImg from "./assets/img/sandwich.jpg";

import {
  useBalance,
  useMarketplaceContract,
} from "./utils/hooks";
import { Container, Nav, Button } from "react-bootstrap";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const marketplaceContract = useMarketplaceContract();

  return (
    <>
      <Notification />

      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={address}
                amount={balance.cUSD}
                symbol="cUSD"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Nfts
              address={address}
              updateBalance={getBalance}
              marketplaceContract={marketplaceContract}
            />
          </main>
        </Container>
      ) : (
        <Cover
          name="NFT Marketplace"
          coverImg={coverImg}
          connect={connect}
        />
      )}
    </>
  );
};

export default App;
