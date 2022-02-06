import styles from '../../css/Rules.module.css';

const Rules = (props) => {
    const isRulesOpen = props.isRulesOpen;
    const setIsRulesOpen = props.setIsRulesOpen;

    return (
        <div className={isRulesOpen ? styles.RulesBlock : styles.RulesNone}>
            <div className={styles.RulesMain}>
                <button onClick={() => setIsRulesOpen(false)}/>
                <div className={styles.RulesInner}>
                    <ul>
                        <li>
                            The Aces Card Contest runs every day from 12AM-11:59PM UTC.
                        </li>
                        <li>
                            You get up to 20 entries per day, with each entry providing you with 4 new "Table Cards."
                        </li>
                        <li>
                            Each entry, you will get up to 10 of your Aces NFTs randomly drawn from your deck alone with those
                            4 Table Cards to make your best hand.
                        </li>
                        <li>
                            After you enter, your entry's respective Aces and Table Cards will appear on the bottom of the screen. 
                            The top shows your best entry from the current contest.
                        </li>
                        <li>
                            Currently, the contest is "Best 5 Card Poker Hand." This game has variants such as 2's Wild and 4's Wild, which
                            provides players with another wild card (on top of the Joker) to increase their chances of drawing low probability hands.        
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Rules;