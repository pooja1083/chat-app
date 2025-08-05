import React from 'react'
import styles from './Layout.module.css';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const Layout = ({children})=> {
  return (
    <div className={styles['layout']}>
        <div className={styles['nav']}>
            <NavBar />
        </div>
        <div className={styles['content']}>
            <SideBar />
            {children}
        </div>
    </div>
  )
}

export default Layout;