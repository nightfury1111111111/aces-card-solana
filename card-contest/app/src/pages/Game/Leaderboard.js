import { useState, useEffect } from 'react';

import styles from '../../css/Leaderboard.module.css';

const Leaderboard = (props) => {
    const rankings = props.rankings;
    const rank = props.rank;
    const wallet = props.wallet;
    const gameId = props.gameId;
    const setIsRulesOpen = props.setIsRulesOpen;

    let gameType;
    if (gameId.substring(8) === "deuceswild") gameType = "Deuces Wild";
    else if (gameId.substring(8) === "4swild") gameType = "4's Wild";
    else gameType = "Five Card Poker";

    // Calculate which hands should be shown (edge cases toward front or back of rankings)
    const [ rankingsToShow, setRankingsToShow ] = useState();

    useEffect(() => {
        if (rankings) {
            let res;
            if (rank <= 5 || rank === "?") res = rankings.slice(0,Math.min(10, rankings.length));
            else if (rank > rankings.length - 5) res = rankings.slice(rankings.length - Math.min(10, rankings.length), rankings.length);
            else res = rankings.slice(rank - Math.min(5, rankings.length / 2), rank).concat(rankings.slice(rank, rank + Math.min(5, rankings.length / 2)));
            res = res.map(r => ({ rank: 0, user: r.user }) );

            // Find user's entry and match with rank
            let match = -1;
            for (let i = 0; i < res.length; i++) {
                if (res[i].user === wallet) {
                    match = i; 
                    break;
                }

            }

            if (match === -1) setRankingsToShow(rankings.slice(0, Math.min(10, rankings.length)).map((entry, i) => ({rank: i + 1, user: entry.user})));
            else {
                for (let i = 0; i < res.length; i++) {
                    if (match !== i) res[i].rank = rank + i - match;
                    else res[i].rank = rank;
                }
                setRankingsToShow(res);
            }
        }
    }, [rankings, rank, wallet, setRankingsToShow]);

    return (
        <div className={styles.LeaderboardContainer}>
            <div className={styles.Leaderboard}>
                <h1>Leaderboard: {gameType}</h1>
                <hr/>
                <ul>
                    
                    {
                        rankingsToShow ? (
                            rankingsToShow.map( (entry, i) => 
                            <li className={Number(entry.rank) === Number(rank) ? styles.BoldRank : ""} key={i} >
                                {`#${entry.rank}: ` + entry.user}
                            </li>
                            )
                        ) : (
                            <></>
                        )
                    }
                </ul>
            </div>
            <button className={styles.RulesButton} onClick={() => setIsRulesOpen(true)}>RULES</button>
        </div>
    )
}

export default Leaderboard;