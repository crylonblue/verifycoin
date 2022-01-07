import styles from "../styles/TextTeaser.module.css"
import { motion } from "framer-motion"

export default function TextTeaser () {
    return <motion.div className={styles.textTeaser} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3, duration: 0.8}}>
        <h2 className={styles.headline}>Providing safety</h2>
        <p className={styles.subHeadline}>We want to provide people with a fair and fraud free cryptospace. We want to be a source of enlightment and trust.</p>
    </motion.div>
}