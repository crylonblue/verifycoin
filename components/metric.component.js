import styles from '../styles/Metric.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion';
import InfoBubble from './infoBubble';
import BlockContent from '@sanity/block-content-to-react'

function getHintByCategory(category) {
    switch (category) {
        case "Community":
            return "We calculate this score based on how big and how engaging the community is. A good community is basically a good sign, that the project will suceed."
        case "Credibility":
            return "We estimate the credibility by searching for the founders, previous audits and history."
        case "Economic Score":
            return "";
        default:
            return false;
    }
}

export default function Metric(props) {
    function handleAccordionClick(event) {
        if(event.target.tagName != "A") {
            toggleActive(!active);
        }
    }

    const [active, toggleActive] = useState(false)
    const {title, percent, description} = props;
    return (
        <div className={styles.metricsContainer} onClick={(event) => handleAccordionClick(event)}>
            <div className={styles.metric}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        {title} {getHintByCategory(title) ? <InfoBubble bubbleText={(getHintByCategory(title))}></InfoBubble> : ""}
                    </div>
                    <div className={styles.metricScore}>
                        {percent}%
                    </div>
                </div>
                <div className={styles.bar}>
                    <motion.div className={styles.barInner} initial={{ width: 0 }} whileInView={{ width: props.percent + "%", transition: { delay: 0.2, duration: 0.4 } }} viewport={{ once: true }} />
                </div>
                <div className={styles.accordion}>
                    <div className={styles.accordionArrow}>
                        <Image src="/arrow-down.svg" width={21} height={13} className={(active ? styles.reverse : "")}></Image>
                    </div>
                    <div className={styles.accordionDescription + (active ? " " + styles.active : " " + styles.hidden)}>
                        {
                            description ? <BlockContent blocks={description} key={description._key} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} imageOptions={{width: 800}}/> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}