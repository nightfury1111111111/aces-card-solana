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
            setRecentGames(history);
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
                        <p>{recentGames?.games ? recentGames.games.length : "0"}</p>
                    </div>
                    <div>
                        <p>Coin balance:</p>
                        <p>Coming soon!</p>
                    </div>
                    <div>
                        <p>Contest history:</p>
                        <div className={styles.History}>
                        {
                            recentGames?.games ? (
                                recentGames.games.slice(0,5).map( (gameId, i) => 
                                    gameId.substring(0,8) !== "testtest" ? (
                                        <div key={i} className={styles.HistoryEntry}>
                                            {`${gameId.substring(8) === "deuceswild" ? "2's Wild " : "5 Card "}${String(Number(gameId.substring(2,4)) + 1).padStart(2, '0')}/${gameId.substring(0,2)} - Rank ${recentGames.ranks[i]}/${recentGames.totals[i]}`}
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                )
                            ) : (
                                <p>Play your first game!</p>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;