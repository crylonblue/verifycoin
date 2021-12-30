import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>verifycoin</title>
        <meta name="description" content="verifycoin" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <section className={styles.main}>
        <nav className={styles.navigation}>
          <div className={styles.logo}>
            <Link href="/">
              <a><Image src="/verifycoin.svg" alt="verifycoin logo" width={186} height={37} /></a>
            </Link>
          </div>
          <ul className={styles.navigationList}>
            <li><Link href="https://docs.verifycoin.io/">docs</Link></li>
          </ul>
        </nav>
        <section className={styles.teaser}>
          <div className={styles.top}>Built on eth. Powered by you.</div>
          <div className={styles.headline}>Helping people understand.</div>
          <div className={styles.description}>We create a safer and better cryptoverse.</div>
          <button className={styles.button}>coming soon</button>
        </section>
      </section>

    </div>
  )
}
