// React, react-router, and react-bootstrap imports
import React, { useState, useEffect, useMemo } from 'react';
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

import { getGameRankings } from './api/games';

// Pages
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';

const App = () => {
  const wallet = useWallet();

  const now = new Date();
  const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  let gameType;
  if ([ "24", "25", "26", "27", "28", "29", "30" ].indexOf(String(utc.getDate()).padStart(2, '0')) !== -1) gameType = "deuceswild";
  else if ([ "31", "01", "02", "03", "04", "05", "06" ].indexOf(String(utc.getDate()).padStart(2, '0')) !== -1) gameType = "4swild";
  else if (["08", "09", "10", "11", "12", "13"].indexOf(String(utc.getDate()).padStart(2, '0')) !== -1) gameType = "secretwild";
  else if (["14", "15", "16", "17", "18", "19", "20"].indexOf(String(utc.getDate()).padStart(2, '0')) !== -1) gameType = "8swild";
  else gameType = "5card";

  //const gameType = "deuceswild";
  const gameId = String(utc.getDate()).padStart(2,'0') + String(utc.getMonth()).padStart(2,'0') + String(utc.getFullYear()) + gameType;
  //const gameId = "thisisit" + gameType;

  const [ rankings, setRankings ] = useState(false);
  const [ reloadRankings, setReloadRankings ] = useState(0);

  // Get current game rankings
  useEffect(() => {
    getGameRankings(gameId).then(entries => {
        if (entries)
          setRankings(entries);
        else setRankings([]);
    })
  }, [wallet, gameId, reloadRankings, setRankings]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home wallet={wallet}/>}/>
        <Route path="/play" 
          element={<Game wallet={wallet} gameId={gameId} rankings={rankings} setRankings={setRankings} reloadRankings={reloadRankings} setReloadRankings={setReloadRankings}/>}
        />
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