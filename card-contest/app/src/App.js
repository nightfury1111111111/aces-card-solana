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
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';

// Pages
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';

const App = () => {
  const wallet = useWallet();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home wallet={wallet}/>}/>
        <Route path="/play" element={<Game wallet={wallet}/>}/>
      </Routes>
    </>
  );
}

const AppWithProvider = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);

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
          <BrowserRouter>
            <App/>
          </BrowserRouter>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default AppWithProvider;