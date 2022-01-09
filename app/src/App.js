// React, react-router, and react-bootstrap imports
import React, { useMemo } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Solana-specific imports
import { clusterApiUrl } from '@solana/web3.js';
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Pages
import Home from './pages/Home';

const App = (props) => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

const AppWithProvider = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network)

  const walletOptions = useMemo(() => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getTorusWallet({
      options: { clientId: 'Get a client ID @ https://developer.tor.us' }
  }),
    getLedgerWallet(),
    getSolletWallet({ network }),
    getSolletExtensionWallet({ network }),
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={walletOptions}>
        <WalletModalProvider>
            <BrowserRouter>
              <App/>
            </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default AppWithProvider;