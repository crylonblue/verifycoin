import styles from '../styles/Score.module.css'

function parseScore(int) {
    return (Math.round(int * 10) / 10).toFixed(1);
}


export default function Score(props) {
    function renderReportScore() {
        return <>
            <div className={styles.score}>{parseScore(score)}</div>
            <div className={styles.scoreDescription}>{scoreDescription}</div>
        </>
    }

    function renderCardScore() {
        return <>
            <div className={styles.cardScore}>{parseScore(score)}</div>
        </>
    }

    const {score, scoreDescription, card} = props;

    return card ? renderCardScore() : renderReportScore()
}