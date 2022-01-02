import styles from '../styles/Metric.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function Metric (props) {
    const [active, toggleActive] = useState(false);
    return (
        <div className={styles.metricsContainer} onClick={() => toggleActive(!active)}>
            <div className={styles.metric}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        {props.title}
                    </div>
                    <div className={styles.metricScore}>
                        {props.percent}%
                    </div>
                </div>
                <div className={styles.bar}>
                    <div className={styles.barInner} style={{width: props.percent + "%"}}></div>
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