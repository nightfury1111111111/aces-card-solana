import styles from '../../css/Profile.module.css';

const Profile = (props) => {
    const wallet = props.wallet;
    const isProfileOpen = props.isProfileOpen;
    const setIsProfileOpen = props.setIsProfileOpen;

    return (
        <div className={isProfileOpen ? styles.ProfileBlock : styles.ProfileNone}>
            <button onClick={() => setIsProfileOpen(false)}>CLOSE</button>
            <p>{wallet}</p>
        </div>
    );
}

export default Profile;