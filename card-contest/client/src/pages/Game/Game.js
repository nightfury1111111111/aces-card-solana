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
    const gameType = "5card";
    const gameId = String(new Date().getDate()).padStart(2,'0') + String(new Date().getMonth()).padStart(2,'0') + String(new Date().getFullYear()) + gameType;
    const [ isProfileOpen, setIsProfileOpen ] = useState(false);
    const [ rankings, setRankings ] = useState();
    const [ rank, setRank ] = useState("?");
    const [ reloadRankings, setReloadRankings ] = useState(0);

    // Get current game rankings and find rank
    useEffect(() => {
        if (wallet?.publicKey) {
            getGameRankings(gameId).then(entries => {
                setRankings(entries);
                if (entries) {
                    let r = entries.map(entry => entry.user).indexOf(wallet.publicKey.toString());
                    setRank(r === -1 ? "?" : r + 1);
                }
                else {
                    setRank("?");
                }
            })
        }
    }, [wallet, gameId, reloadRankings, setRank, setRankings]);

    return wallet.publicKey ? (
        <div className={styles.Game}>
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
                    <Leaderboard wallet={wallet.publicKey.toString()} rankings={rankings} rank={rank}/>
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