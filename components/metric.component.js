import styles from '../styles/Metric.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion';
import InfoBubble from './infoBubble';

function getHintByCategory(category) {
    switch (category) {
        case "Community":
            return "We calculate this score based on how big and how engaging the community is. A good community is basically a good sign, that the project will suceed."
        default:
            return false;
    }
}

export default function Metric (props) {
    const [active, toggleActive] = useState(false);
    return (
        <div className={styles.metricsContainer} onClick={() => toggleActive(!active)}>
            <div className={styles.metric}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        {props.title} {getHintByCategory(props.title) ? <InfoBubble bubbleText={(getHintByCategory(props.title))}></InfoBubble> : ""}
                    </div>
                    <div className={styles.metricScore}>
                        {props.percent}%
                    </div>
                </div>
                <div className={styles.bar}>
                    <motion.div className={styles.barInner} initial={{width: 0}} whileInView={{width: props.percent + "%", transition: {delay: 0.2, duration: 0.4}}} viewport={{once: true}}/>
                </div>
                <div className={styles.accordion}>
                    <div className={styles.accordionArrow}>
                        <Image src="/arrow-down.svg" width={21} height={13} className={(active ? styles.reverse : "")}></Image>
                    </div>
                    <div className={styles.accordionDescription + (active ?  " " + styles.active:  " " + styles.hidden)}>
                        {props.description}
                    </div>
                </div> 
            </div>
        </div>
    )
}