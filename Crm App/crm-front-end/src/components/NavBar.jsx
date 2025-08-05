import React from 'react'
import { AccountCircle } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './NavBar.module.css';
import Logo from '../svg/logo.svg';

const NavBar = ()=> {
  return (
    <div className={styles['container']}>
      <div className={styles['logo']}>
        <img src={Logo} alt="Elementor" />
      </div>

      <div>
        <div className={styles['user-info']}>
          <AccountCircle />
          Hi Adam!
          <KeyboardArrowDownIcon />
        </div>
      </div>
    </div>
  )
}

export default NavBar;
