import React, {useState} from "react";
import {useUser} from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import styles from "./AuthButtons.module.scss";
import {MdStars} from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useAlert} from "@/context/AlertContext";
import {useAuthActions} from "@/utils/logoutClient";
import {MdGeneratingTokens} from "react-icons/md";
import {Tooltip} from "@mui/material";

const AuthButtons: React.FC = () => {
    const user = useUser();
    const {logout, logoutAll} = useAuthActions();
    const {showAlert} = useAlert();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const ok = await logout();
        showAlert(ok ? "Logged out" : "Logout failed", "", ok ? "success" : "error");
        handleMenuClose();
    };
    if (user) {
        return (
            <div className={styles.authedUser}>
                <div className={styles.userInfo}>
                    <Avatar
                        src={user.name}
                        alt={user.name}
                        className={styles.avatar}
                    />
                    <div className={styles.userDetails}>
                        <span className={styles.userName}>{user.name}</span>
                        <div className={styles.userBalance}>
                            <Tooltip title={`Your's available token balance is ${user.tokens} Tokens`}>
                                <p className={styles.balanceText}>
                                    <MdGeneratingTokens className={styles.tokenIcon}/> {user.tokens ?? 0}
                                </p>
                            </Tooltip>
                            <Link href="/pricing" className={styles.buyLink}>
                                Add funds
                            </Link>
                        </div>
                    </div>
                </div>
                <Link href="/dashboard">
                    <ButtonUI text="Go to App" shape="default" color="secondary" hoverColor="secondary"
                              hoverEffect="none"/>
                </Link>
                <ButtonUI text="Logout" shape="default" color="linkHover" hoverColor="linkHover" hoverEffect="none"
                          onClick={handleLogout}/>
            </div>
        );
    }

    return (
        <div className={styles.nonAuthedButtons}>
            <Link href="/sign-in">
                <ButtonUI text="Sign In" shape="default" color="linkHover" hoverColor="linkHover" hoverEffect="none"
                          fullWidth/>
            </Link>
            <Link href="/sign-up">
                <ButtonUI text="Sign Up" shape="default" color="secondary" hoverColor="secondary" hoverEffect="none"
                          fullWidth/>
            </Link>
        </div>
    );
};

export default AuthButtons;