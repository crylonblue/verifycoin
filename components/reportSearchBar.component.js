import styles from "../styles/ReportSearchBar.module.css"
import { useState } from 'react'
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '../sanity';
import Link from 'next/link';


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return builder.image(source)
}

export default function ReportSearchBar() {
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoadingState] = useState(false);
    const [focus, setFocusState] = useState(false);


    async function inputChange(event) {
        setLoadingState(true);
        const response = await (await fetch("/api/search?search=" + event.target.value)).json();
        setLoadingState(false);
        setSearchResult(response.result)
    }

    function blurInput(event) {
        if (!event.relatedTarget) {
            setFocusState(false);
            if (event.target.value == "") {
                setSearchResult([]);
            }
        }
    }

    function blurHandler() {
        setFocusState(false);
        setSearchResult([]);
    }

    return (
        <div className={styles.searchInputContainer} tabIndex="0">
            <div className={styles.searchInputInner}>
                <div className={styles.searchInput + (focus || searchResult.length ? " " + styles.focused : "")}>
                    <div className={styles.topContent}>
                        <div className={styles.searchIcon}>
                            <Image src="/search-icon.svg" width={20} height={20}></Image>
                        </div>
                        <div className={styles.inputWrapper}>
                            <input type="text" className={styles.input} placeholder="Search for cryptoproject ..." onKeyUp={(event) => inputChange(event)} onFocus={(event) => { setFocusState(true); inputChange(event) }} onBlur={(event) => blurInput(event)} />
                        </div>
                    </div>
                    <div className={styles.bottomContent}>
                        <SearchResult searchResult={searchResult} loading={loading} blurHandler={blurHandler}></SearchResult>
                    </div>
                </div>
            </div>
        </div>
    )
}


function SearchResult(props) {
    const { searchResult, loading, blurHandler } = props;
    if (loading) {
        return (
            <div className={styles.searchOutput} key="searchOutput">
                <div className={styles.loader}></div>
            </div>
        )
    }
    if (searchResult.length > 0) {
        return (
            <div className={styles.searchOutput} key="searchOutput">
                {
                    searchResult.map((report) => (
                        <Link href={"/reports/" + report.slug.current} key={report._id}>
                            <div className={styles.searchResult} key={"searchResult" + report._id} onClick={() => blurHandler()}>
                                <div className={styles.resultIcon} key={"searchIcon" + report._id}>
                                    <div className={styles.resultIconInner} style={{ backgroundImage: "url('" + urlFor(report.image).width(50).url() + "')" }} key={"searchIconInner" + report._id}>
                                    </div>
                                </div>
                                <div className={styles.resultTitle} key={"searchTitle" + report._id}>
                                    {report.title}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    } else {
        return <span key="noData"></span>;
    }
}