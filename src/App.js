import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useContractKit } from "@celo-tools/use-contractkit";
import React from "react";
import Wallet from "./components/wallet/Wallet";
import { Notification } from "./components/utils/Notifications";
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

  console.log({marketplaceContract})

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
        <div
          className="d-flex justify-content-center flex-column text-center "
          style={{ background: "#000", minHeight: "100vh" }}
        >
          <div className="mt-auto text-light mb-5">
            <div
              className=" ratio ratio-1x1 mx-auto mb-2"
              style={{ maxWidth: "320px" }}
            >
              <img src={coverImg} alt="" />
            </div>
            <h1>NFT Marketplace</h1>
            <p>Please connect your wallet to continue.</p>
            <Button
              onClick={() => connect().catch((e) => console.log(e))}
              variant="outline-light"
              className="rounded-pill px-3 mt-3"
            >
              Connect Wallet
            </Button>
          </div>

          <p className="mt-auto text-secondary">Powered by Celo</p>
        </div>
      )}
    </>
  );
};

export default App;
