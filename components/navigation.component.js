import styles from '../styles/Navigation.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navigation() {
    const [burgerOpen, setBurgerState] = useState(false)
    
    const topVariants = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: 45,
            translateY: 4
        }
    }

    const botVariants = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: -45,
            translateY: -4
        }
    }

    const mobileMenuVariants = {
        closed: {
            translateX: "100%",
            opacity: 0,
            transition: {
                delay: .4,
                duration: .5,
            }
        },
        opened: {
            translateX: 0,
            opacity: 1,
            transition: {
                duration: .5,
                staggerChildren: .3,
            }
        }
    }

    const textVariants = {
        closed: {
            translateX: 100,
            opacity: 0
        },
        opened: {
            translateX: 0,
            opacity: 1,
            transition: {
                delay: .5
            }
        }
    }

    const navItems = [
        {
            text: "explore",
            href: "/explore"
        },
        {
            text: "docs",
            href: "https://docs.verifycoin.io/"
        }
    ]

    return <nav className={styles.navigation}>
        <div className={styles.logo}>
            <Link href="/">
                <a><Image src="/verifycoin.svg" alt="verifycoin logo" width={186} height={37} /></a>
            </Link>
        </div>
        <ul className={styles.navigationList}>
            {
                navItems.map(({text, href}, i) => {
                    return <li key={i}><Link href={href}>{text}</Link></li>
                })
            }
            <div className={styles.burgerMenu} onClick={() => {setBurgerState(!burgerOpen)}}>
                <motion.div animate={ burgerOpen ? "opened" : "closed"} variants={topVariants} />
                <motion.div animate={ burgerOpen ? "opened" : "closed"} variants={botVariants} />
            </div>
        </ul>
        <motion.div className={styles.mobileMenu} variants={mobileMenuVariants} animate={ burgerOpen ? "opened" : "closed"}>
            <motion.a className={styles.mobileMenuItem} variants={textVariants} animate={ burgerOpen ? "opened" : "closed"} href="/">home</motion.a>
            {
                navItems.map(({text, href}, i) => {
                    return <motion.a className={styles.mobileMenuItem} variants={textVariants} animate={ burgerOpen ? "opened" : "closed"} href={href}>{text}</motion.a>
                })
            }

        </motion.div>
    </nav>
}