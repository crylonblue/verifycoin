import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Navigation from '../../components/navigation.component'
import Metric from '../../components/metric.component'
import { sanityClient } from '../../sanity'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import ReportSearchBar from '../../components/reportSearchBar.component'
import Score from '../../components/score'
import RiskIndicator from '../../components/riskIndicator'

const builder = imageUrlBuilder(sanityClient)

function urlFor(source) {
    return builder.image(source)
}

const showRiskIndicator = true;

export default function Details({ report }) {
    const {image, title, metrics, description, score, scoreDescription, tags, additionalContent, links, riskIndicator} = report;
    
    function getBlockContent() {
        if(additionalContent) {
            return <BlockContent blocks={additionalContent} key={additionalContent._key}/>
        } else {
            return null
        }
        
    }
    
    return (<div className={styles.container}>
        <Head>
            <title>verifycoin</title>
            <meta name="description" content="verifycoin" />
        </Head>
        <section className={styles.main}>
            <Navigation></Navigation>
            <ReportSearchBar></ReportSearchBar>
            <section className={styles.detailsContainer}>
                <section className={styles.detailsInner}>
                    <div className={styles.detailsHead}>
                        <div className={styles.detailsIconContainer}>
                            <div className={styles.detailsIcon} style={{ backgroundImage: "url('" + urlFor(image).width(200).url() + "')" }}>
                            </div>
                        </div>
                        <div className={styles.detailsHeadline}>
                            <h1>{title}</h1>
                            <div className={styles.description}>{description}</div>
                            <div className={styles.tagContainer}>
                                {
                                    tags ? tags.map((tag) => (<a href="#" key={tag}>{tag}</a>)) : ""
                                }
                            </div>
                        </div>
                        <div className={styles.detailsScore}>
                            { 
                                showRiskIndicator ? (<RiskIndicator risk={riskIndicator}></RiskIndicator>) : (<Score score={score} scoreDescription={scoreDescription}></Score>)
                            }
                        </div>
                    </div>
                    <div className={styles.statistics}>
                        <div className={styles.keymetrics}>
                            <h2>Key metrics:</h2>
                            <div className={styles.metricsContainer}>
                                {
                                    metrics ? metrics.map((metric) => (
                                        <Metric title={metric.metricName} percent={metric.metricScore} description={metric.metricBlock} key={metric._key}></Metric>
                                    )) : ""
                                }
                            </div>
                        </div>
                        <div className={styles.links}>
                            <h2>Links:</h2>
                            <div className={styles.linkContainer}>
                                {
                                    links ? links.map((link) => (<a href={link.linkUrl} key={link._key}>{link.linkName}</a>)) : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.additionalContent}>
                        {getBlockContent()}
                    </div>
                </section>
            </section>
        </section>
    </div>)
}

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug
    const query = `*[_type == "report" && slug.current == $pageSlug][0]`
    const report = await sanityClient.fetch(query, { pageSlug })

    if (!report) {
        return {
            notFound: true,
            props: {}
        }
    }

    return {
        props: {
            report: report
        }
    }
}