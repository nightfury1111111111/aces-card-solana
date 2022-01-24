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
    const now = new Date();
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const gameType = [ "24", "25", "26", "27", "28", "29", "30" ].indexOf(String(utc.getDate()).padStart(2, '0')) !== -1 ? "deuceswild" : "5card";
    //const gameType = "deuceswild";
    const gameId = String(utc.getDate()).padStart(2,'0') + String(utc.getMonth()).padStart(2,'0') + String(utc.getFullYear()) + gameType;
    //const gameId = "testtest" + gameType;
    
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