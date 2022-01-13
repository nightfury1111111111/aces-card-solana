import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Profile from './Profile';
import Leaderboard from './Leaderboard';
import Header from '../../components/Header';

import styles from '../../css/Game.module.css';

const Game = (props) => {
    const wallet = props.wallet;
    const [ isProfileOpen, setIsProfileOpen ] = useState(false);

    return wallet.publicKey ? (
        <div className={styles.Game}>
            <Header user={true} onProfileClick={() => setIsProfileOpen(true)}/>
            <Leaderboard wallet={wallet.publicKey.toString()} />
            <Profile wallet={wallet.publicKey.toString()} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}/>
        </div>
    ) : (
        <Navigate to="/"/>
    )
    ;
}

export default Game;