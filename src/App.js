import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import Wallet from "./components/wallet/Wallet";
import { Notification } from "./components/utils/Notifications";
import { Cover } from "./components/utils/Cover";
import Nfts from "./components/minter/Nfts";
import coverImg from "./assets/img/nft_geo_cover.png";
import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

import {
  useBalance,
  useMinterContract,
} from "./utils/hooks";
import { Container, Nav } from "react-bootstrap";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const minterContract = useMinterContract();


  return (
    <>
      <Notification />

      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Nfts
              name="GEO Collection"
              updateBalance={getBalance}
              minterContract={minterContract}
            />
          </main>
        </Container>
      ) : (
        <Cover
          name="GEO Collection"
          coverImg={coverImg}
          connect={connect}
        />
      )}
    </>
  );
};

export default App;
