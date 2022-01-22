import styles from '../styles/Footer.module.css'
import Image from 'next/image'

export default function Footer() {
    const year = new Date().getFullYear()
    return <footer className={styles.footer}>
        <div className={styles.inner}>
            <div className={styles.legals}>
                Copyright &copy; {year} verifycoin All rights reserved
            </div>
            <div className={styles.logo}><Image src="/verifycoin.svg" alt="verifycoin logo" width={186} height={37} /></div>
            <div className={styles.socials}>
                <div className={styles.social}><Image src="/discord.svg" alt="discord logo" width={36} height={27} /></div>
            </div>
        </div>
    </footer>
}