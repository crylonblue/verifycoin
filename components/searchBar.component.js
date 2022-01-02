import styles from '../styles/SearchBar.module.css'
import { useState } from 'react'
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '../sanity';
import Link from 'next/link';

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return builder.image(source)
}

export default function SearchBar (props) {

    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function inputChange(event) {
        setSearchResult([])
        const searchInput = event.target.value;
        setSearchInput(searchInput)
        performSearch();
    }

    async function performSearch() {
        setSearchResult([])
        if(searchInput.length > 2) {
            const response = await (await fetch("/api/search?search=" + searchInput)).json();
            setSearchResult(response.result)
        }
    }

    return (
        <div className={styles.searchInput}>
            <div className={styles.topContent}>
                <div className={styles.searchIcon}>
                    <Image src="/search-icon.svg" width={20} height={20}></Image>
                </div>
                <div className={styles.inputWrapper}>
                    <input type="text" className={styles.input} placeholder="Search for cryptoproject ..." onChange={inputChange} />
                </div>
            </div>
            <div className={styles.bottomContent}>
                <SearchResult searchResult={searchResult}></SearchResult>
            </div>
        </div>

    )
}

function SearchResult(props) {
    const {searchResult} = props;

    if(searchResult.length > 0) {
        return (
            <div className={styles.searchOutput} key="searchOutput">
                {
                    searchResult.map((report) => (
                        <Link href={"/reports/" + report.slug.current} key={report._id}>
                            <div className={styles.searchResult} key={"searchResult" + report._id}>
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