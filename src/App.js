import './App.css';
import '@celo-tools/use-contractkit/lib/styles.css';

import { useContractKit } from '@celo-tools/use-contractkit';

import React from 'react';

import Address from './components/wallet/Address';
import Balance from './components/wallet/Balance';
import ConnectWallet from './components/wallet/ConnectWallet';
import Disconnect from './components/wallet/DisconnectWallet';

import { Notification } from './components/utils/Notifications';
import Products from './components/marketplace/Products';
import Cover from './components/marketplace/Cover';

import { useBalance, useMarketplaceContract, useCusdContract } from './utils/hooks';

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const marketplaceContract = useMarketplaceContract();
  const cusdContract = useCusdContract();

  return (
    <>
      <Notification />
      <div className="container" style={{ maxWidth: '72em' }}>
        {address ? (
          <>
            <nav className="navbar bg-white navbar-light text-dark mt-2">
              <div className="container-fluid">
                <Address address={address} />
                <Balance amount={balance.cUSD} symbol="cUSD" />
                <Disconnect destroy={destroy} />
              </div>
            </nav>
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
      </div>
    </>
  );
};

export default App;
