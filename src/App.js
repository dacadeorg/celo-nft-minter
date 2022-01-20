import React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import Wallet from "./components/wallet";
import { Notification } from "./components/ui/Notifications";
import Cover from "./components/minter/Cover";
import Nfts from "./components/minter/nfts";
import coverImg from "./assets/img/nft_geo_cover.png";
import "./App.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

import { useBalance, useMinterContract } from "./hooks";
import { Container, Nav } from "react-bootstrap";

const App = function AppWrapper() {
  /*
  address : fetch the connected wallet address
  destroy: terminate connection to user wallet
  connect : connect to the celo blockchain
   */
  const {address, destroy, connect} = useContractKit();

  //  fetch user's celo balance using hook
  const {balance, getBalance} = useBalance();

  // initialize the NFT mint contract
  const minterContract = useMinterContract();

  return (
      <>
        <Notification/>

        {address ? (
            <Container fluid="md">
              <Nav className="justify-content-end pt-3 pb-5">
                <Nav.Item>

                  {/*display user wallet*/}
                  <Wallet
                      address={address}
                      amount={balance.CELO}
                      symbol="CELO"
                      destroy={destroy}
                  />
                </Nav.Item>
              </Nav>
              <main>

                {/*list NFTs*/}
                <Nfts
                    name="GEO Collection"
                    updateBalance={getBalance}
                    minterContract={minterContract}
                />
              </main>
            </Container>
        ) : (
            //  if user wallet is not connected display cover page
            <Cover name="GEO Collection" coverImg={coverImg} connect={connect}/>
        )}
      </>
  );
};

export default App;
