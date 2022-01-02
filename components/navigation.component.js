import styles from '../styles/Navigation.module.css'
import Link from 'next/link'
import Image from 'next/image'


export default function Navigation() {
    return <nav className={styles.navigation}>
        <div className={styles.logo}>
            <Link href="/">
                <a><Image src="/verifycoin.svg" alt="verifycoin logo" width={186} height={37} /></a>
            </Link>
        </div>
        <ul className={styles.navigationList}>
            <li><Link href="https://docs.verifycoin.io/">docs</Link></li>
        </ul>
    </nav>
}