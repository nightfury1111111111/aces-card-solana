import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import Header from '../../components/Header';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Profile from './Profile';

import { getGameRankings } from '../../api/games';

import styles from '../../css/Game.module.css';

const Game = (props) => {
    const wallet = props.wallet;
    const gameId = props.gameId;
    const rankings = props.rankings;
    const setRankings = props.setRankings;
    const reloadRankings = props.reloadRankings;
    const setReloadRankings = props.setReloadRankings;

    const [ isProfileOpen, setIsProfileOpen ] = useState(false);
    const [ rank, setRank ] = useState("?");

    // Get current game rankings and find rank
    useEffect(() => {
        if (wallet?.publicKey) {
            if (rankings) {
                let r = rankings.map(entry => entry.user).indexOf(wallet.publicKey.toString());
                setRank(r === -1 ? "?" : r + 1);
            }
            else {
                setRank("?");
            }
        }
    }, [wallet, gameId, rankings, setRank]);

    return wallet.publicKey ? (
        <div className={styles.Game}>
            <p><b>BETA</b></p>
            <div className={styles.Content}>
                <div className={styles.GameArea}>
                    <Header user={true} onProfileClick={() => setIsProfileOpen(true)}/>
                    <Dashboard 
                        wallet={wallet.publicKey.toString()} 
                        gameId={gameId} 
                        rankings={rankings} 
                        rank={rank} 
                        reloadRankings={reloadRankings}
                        setRankings={setRankings} 
                        setRank={setRank}
                        setReloadRankings={setReloadRankings}
                    />
                </div>
                <div className={styles.Rankings}>
                    <Leaderboard wallet={wallet.publicKey.toString()} gameId={gameId} rankings={rankings} rank={rank}/>
                </div>
            </div>
            <Profile wallet={wallet.publicKey.toString()} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}/>
        </div>
    ) : (
        <Navigate to="/"/>
    )
    ;
}

export default Game;