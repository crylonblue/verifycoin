import styles from '../styles/Card.module.css'
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '../sanity'

function parseScore(int) {
    return (Math.round(int * 10) / 10).toFixed(1);
}

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return builder.image(source)
}

export default function Card (props) {
    const {report} = props;
    const {title, tags, score, image, slug} = report;
    return (
        <Link href={"/reports/" + slug.current}>
            <a className={styles.card}>
                <div className={styles.cardInner}>
                    <div className={styles.cardLeft}>
                        <div className={styles.title}>
                            {title}
                        </div>
                        <div className={styles.description}>
                            {   
                                tags ? tags.map((tag, index) => {
                                    if (index + 1 == tags.length) {
                                        return tag
                                    } else {
                                        return tag + ", "
                                    }
                                }) : ""
                            }
                        </div>
                        <div className={styles.score}>
                            {parseScore(score)}
                        </div>
                    </div>
                    <div className={styles.cardRight}>
                        <div className={styles.icon}  style={{ backgroundImage: "url('" + urlFor(image).width(200).url() + "')" }}></div>
                    </div>
                </div>
            </a>
        </Link>
    )
}