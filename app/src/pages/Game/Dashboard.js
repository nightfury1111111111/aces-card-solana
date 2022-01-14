import { useState, useEffect } from 'react';

import { getAvailableCards } from '../../api/users';
import { playGame, getGameRankings } from '../../api/games';

import styles from '../../css/Dashboard.module.css';

const faceRankings = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const Dashboard = (props) => {
    const wallet = props.wallet;
    const gameId = props.gameId;
    const rank = props.rank;
    const setRank = props.setRank;
    const rankings = props.rankings;
    const setRankings = props.setRankings;
    const [ availableCards, setAvailableCards ] = useState();
    const [ acesCards, setAcesCards ] = useState([]);
    const [ wildCards, setWildCards ] = useState([]);
    const [ bestHand, setBestHand ] = useState();

    // Get available cards
    useEffect(() => {
        getAvailableCards(wallet, gameId).then(cards => {
            setAvailableCards(cards);
        })
        return () => setAvailableCards([]);
    }, [wallet, gameId]);

    // Extract aces cards from available cards array
    useEffect(() => {
        if (availableCards)
            setAcesCards(availableCards.filter(card => card.image));
    }, [availableCards, setAcesCards]);

    // Extract wild cards from available cards array
    useEffect(() => {
        if (availableCards)
            setWildCards(availableCards.filter(card => !card.image));
    }, [availableCards, setWildCards]);

    // Get best hand from rankings
    useEffect(() => {
        if (rankings) {
            let i = rankings.map(entry => entry.user).indexOf(wallet);
            console.log("setting");
            setBestHand(i !== -1 ? rankings[i] : null);
        }
    }, [wallet, rankings]);

    return (
        <div className={styles.DashContainer}>
            <div className={styles.Dashboard}>
                <div className={styles.Play}>
                    {
                        bestHand ? (
                            <>
                                <p>{`${(bestHand.handType[0].toUpperCase() + bestHand.handType.slice(1)).replace("-", " ")}`}</p>
                                <div className={styles.Hand}>
                                    {
                                        bestHand.hand
                                            .sort((a, b) => (faceRankings.indexOf(b.face) - faceRankings.indexOf(a.face)))
                                            .map( (card, i) => 
                                            <div key={i} >
                                                {
                                                    card.image ? (
                                                        <img src={card.image} alt={card.face + " of " + card.suit}/>
                                                    ) : (
                                                        <img src={`/images/wildCards/${card.face}${card.suit}.png`} alt={card.face + " of " + card.suit}/>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={styles.Replay}>
                                    <p>{rankings ? `Rank ${rank}/${rankings.length}` : `Rank`}</p>
                                    <button onClick={() => playGame(wallet, gameId).then(entry => {
                                        setBestHand(entry); 
                                        if (wallet) {
                                            getGameRankings(gameId).then(entries => {
                                                setRankings(entries);
                                                let r = entries.map(entry => entry.user).indexOf(wallet);
                                                setRank(r === -1 ? "?" : r + 1);
                                            })
                                        }
                                    })}>RESHUFFLE</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Best Hand</p>
                                <button onClick={() => playGame(wallet, gameId).then(entry => {
                                        setBestHand(entry); 
                                        if (wallet) {
                                            getGameRankings(gameId).then(entries => {
                                                setRankings(entries);
                                                if (entries) {
                                                    let r = entries.map(entry => entry.user).indexOf(wallet);
                                                    setRank(r === -1 ? "?" : r + 1);
                                                }
                                            })
                                        }
                                    })}>PLAY</button>
                                <p>{rankings ? `Rank ${rank}/${rankings.length}` : `Rank`}</p>
                            </>
                        )
                    }
                </div>
                <hr/>
                <div className={styles.Cards}>
                    <p>Available Cards</p>
                    <div className={styles.CardGrid}>
                    {
                        acesCards.map( (card, i) => 
                            <div key={i} className={styles.Card}>
                                <img src={card.image} alt={card.face + " of " + card.suit}/>
                            </div>
                        )
                    }
                    {
                        wildCards.map( (card, i) => 
                            <div key={i} className={styles.Card}>
                                <img src={`/images/wildCards/${card.face}${card.suit}.png`} alt={card.face + " of " + card.suit}/>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;