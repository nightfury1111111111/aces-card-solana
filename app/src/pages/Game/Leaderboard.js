import { useState, useEffect } from 'react';

import styles from '../../css/Leaderboard.module.css';

const Leaderboard = (props) => {
    const rankings = props.rankings;
    const rank = props.rank;

    // Calculate which hands should be shown (edge cases toward front or back of rankings)
    const [ rankingsToShow, setRankingsToShow ] = useState();
    let r = rank - 1;

    useEffect(() => {
        if (rankings) {
            if (rank <= 5) setRankingsToShow(rankings.slice(0,Math.min(8, rankings.length)));
            else if (rank > rankings.length - 5) setRankingsToShow(rankings.slice(rankings.length - Math.min(8, rankings.length), rankings.length));
            else setRankingsToShow(rankings.slice(rank - Math.min(4, rankings.length / 2), rank).concat(rankings.slice(rank, rank + Math.min(4, rankings.length / 2))));
        }
    }, [rankings, rank, setRankingsToShow]);

    return (
        <div className={styles.LeaderboardContainer}>
            <div className={styles.Leaderboard}>
                <h1>Leaderboard</h1>
                <hr/>
                <ul>
                    
                    {
                        rankingsToShow ? (
                            rankingsToShow.map( (entry, i) => 
                            <li className={i === r ? styles.BoldRank : ""} key={i} >
                                {`#${i + 1}: ` + entry.user}
                            </li>
                            )
                        ) : (
                            <></>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Leaderboard;