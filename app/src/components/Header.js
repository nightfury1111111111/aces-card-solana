import React from 'react';

import styles from '../css/Header.module.css';

const Header = (props) => {
    const user = props.user;
    let buttonWidth = "184px";

    return (
        <div className={styles.Header}>
            <div style={ { minWidth: buttonWidth } }>
                <p>The <b>ACES</b></p>
            </div>
            <p>The <b>ACES Contest</b></p>
            <div style={ { minWidth: buttonWidth } }>
                <button style={ user ? { width: buttonWidth } : { display: "none" } }>PROFILE</button>
            </div>
        </div>
    )
}

export default Header;