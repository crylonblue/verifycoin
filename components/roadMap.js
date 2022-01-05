import styles from "../styles/RoadMap.module.css"

export default function RoadMap() {
    return <div className={styles.roadMapContainer}>
            <h2 className={styles.bigHeadline}>Roadmap</h2>
            <div className={styles.roadMap}>
                <div className={styles.blankLeft}></div>
                <div className={styles.contentRight + " " + styles.active}>
                    <h3 className={styles.headline}>Launch of website and basic functionalities</h3>
                    <div className={styles.description}>
                        Gathering traffic and building a community.
                    </div>
                </div>
                <div className={styles.contentLeft}>
                    <h3 className={styles.headline}>Launch of central verificators</h3>
                    <div className={styles.description}>
                        Get new reviews for endusers.
                    </div>
                </div>
                <div className={styles.blankRight}></div>
                <div className={styles.blankLeft}></div>
                <div className={styles.contentRight}>
                    <h3 className={styles.headline}>Launch of anonymous verificators</h3>
                    <div className={styles.description}>
                        Start token development
                    </div>
                </div>
            </div>
    </div>
}
