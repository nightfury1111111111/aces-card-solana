import { useState, useEffect } from 'react';

import { getRecentGames } from '../../api/users';

import styles from '../../css/Profile.module.css';

const Profile = (props) => {
    const wallet = props.wallet;
    const isProfileOpen = props.isProfileOpen;
    const setIsProfileOpen = props.setIsProfileOpen;

    const [ recentGames, setRecentGames ] = useState();

    useEffect(() => {
        getRecentGames(wallet).then(history => {
            let games = [];
            // Brute force find rankigns from last 5 games
            for (let i = 0; i < 5; i++) {
                let date = history.games[i].gameId.slice(0,2);
                let month = history.games[i].gameId.slice(2,4);
                let year = history.games[i].gameId.slice(4,8);
                games.push({ date: `${date}/${month}/${year}` })
            }
            
        })
    }, [wallet, setRecentGames]);

    return (
        <div className={isProfileOpen ? styles.ProfileBlock : styles.ProfileNone}>
            <div className={styles.ProfileMain}>
                <button onClick={() => setIsProfileOpen(false)}/>
                <div className={styles.ProfileInner}>
                    <div>
                        <p>Wallet ID</p>
                        <p style={{ overflow: "hidden", textOverflow: "ellipsis", maxWidth: "50%" }}>{wallet}</p>
                    </div>
                    <div>
                        <p>Games played:</p>
                        <p>0</p>
                    </div>
                    <div>
                        <p>Coin balance:</p>
                        <p>0c</p>
                    </div>
                    <div>
                        <p>Contest history:</p>
                        <ul>
                        {
                            recentGames.map()
                        }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;