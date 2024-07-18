import { NavLink } from "react-router-dom";

import Logo from "./Logo";

import styles from './NavBar.module.css';

function NavBar() {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li><NavLink to="/pricing" >Pricing</NavLink></li>
                <li><NavLink to="/product" >Product</NavLink></li>
                <li><NavLink to="/login" >Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavBar
