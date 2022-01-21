import styles from "../styles/ListItem.module.css"
import Link from "next/link"
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '../sanity'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return builder.image(source)
}

export default function ListItem(props) {
    const {title, tags, image, slug} = props.report
    return <Link href={"/reports/" + slug.current}>
        <a>
            <div className={styles.listItem}>
                <div className={styles.image}>
                    <div className={styles.icon}  style={{ backgroundImage: "url('" + urlFor(image).width(200).url() + "')" }}></div>
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.tags}>
                    {
                        tags.map((tag, i) => {
                            return <div className={styles.tag} key={i}>{tag}</div>
                        })
                    }
                </div>
            </div>
        </a>
    </Link>
}