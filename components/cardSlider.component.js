import styles from '../styles/CardSlider.module.css'
import Card from './card.component';

export default function CardSlider (props) {
    const {reports} = props;
    let sampleReports = Array(8);
    for(let [index, report] of reports.entries()) {
        sampleReports[index] = reports[index];
    }

    sampleReports.fill(reports[0], reports.length, 8);
    
    return (
        <section className={styles.cardsContainer}>
            <div className={styles.cardsTitle}>Latest reviews</div>
            <section className={styles.cardsInner}>
                {
                    sampleReports.map((report, index) => (
                        <Card report={report} key={index}></Card>
                    ))
                }
            </section>
      </section> 
    )
}