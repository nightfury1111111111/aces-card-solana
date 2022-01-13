import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { WalletMultiButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import { userLogin } from '../../api/users';

import Header from '../../components/Header';

import styles from '../../css/Home.module.css';

// Wallet Multi-Button styling
require('@solana/wallet-adapter-react-ui/styles.css');
require('../../css/main.css');

const Home = (props) => {
    const wallet = props.wallet;
    
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    // Go to '/play' when logged in
    useEffect(() => {
        if (wallet.publicKey) {
            userLogin(wallet.publicKey.toString());
            setIsLoggedIn(true);
        } 
    
    }, [wallet]);

    return isLoggedIn ? (
            <Navigate to="/play"/>
        ) : (
        <div className={styles.Home}>
            <Header user={false} onProfileClick={() => {}}/>
                <div className={styles.Content}>
                    <WalletModalProvider>
                        <WalletMultiButton>PLAY</WalletMultiButton>
                    </WalletModalProvider>
                    <div className={styles.Or}>
                        <div></div><hr/>
                        <p>Or</p>
                        <hr/>
                    </div>
                    <a href="https://www.magiceden.io">BUY</a>
                    <p>In Order to Play the Game You Must Hold 3 Aces NFTs</p>
                </div>
        </div>
    )
}

export default Home;