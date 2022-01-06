import styles from "../styles/RiskIndicator.module.css"

export default function RiskIndicator(props) {
    
    const {risk, card} = props

    switch(risk){
        case "low":
            return <div className={styles.lowRisk + (card ? " " + styles.cardResponsive : "")}>low risk</div>
        case "medium":
            return <div className={styles.mediumRisk + (card ? " " + styles.cardResponsive : "")}>medium risk</div>
        case "high":
            return <div className={styles.highRisk + (card ? " " + styles.cardResponsive : "")}>high risk</div>
    }

    return <div className={styles.unknown + (card ? " " + styles.cardResponsive : "")}>unknown</div>

}