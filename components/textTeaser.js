import styles from "../styles/TextTeaser.module.css"
import { motion } from "framer-motion"

export default function TextTeaser () {
    return <motion.div className={styles.textTeaser} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3, duration: 0.8}} viewport={{ once: true }}>
        <h2 className={styles.headline}>Better grasp on projects.</h2>
        <p className={styles.subHeadline}>We summarize new projects and bundle important metrics.</p>
    </motion.div>
}