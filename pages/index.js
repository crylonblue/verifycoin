import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navigation from '../components/navigation.component'
import { sanityClient } from '../sanity'
import imageUrlBuilder from '@sanity/image-url'
import CardSlider from '../components/cardSlider.component'
import SearchBar from '../components/searchBar.component'

const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return builder.image(source)
}


export default function Home(props) {
  const {reports} =  props;
  return (
    <div className={styles.container}>
      <Head>
        <title>verifycoin</title>
        <meta name="description" content="verifycoin" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <section className={styles.main}>
        <Navigation></Navigation>
        <section className={styles.teaser}>
          <div className={styles.aligner}>
            <div className={styles.top}>Helping the movement.</div>
            <div className={styles.headline}>Helping people understand.</div>
            <SearchBar></SearchBar>
            <div className={styles.description}>Fraud protection for everyone. Check for crypto project safety instantly.</div>
          </div>
        </section>
      </section>
      <CardSlider reports={reports}></CardSlider>
    </div>
  )
}


export const getServerSideProps = async () => {
  const query = `*[_type == "report"][0..8]{title, tags, score, image, slug}`
  const reports = await sanityClient.fetch(query)

  if (!reports.length) {
      return {
          notFound: true,
          props: {}
      }
  }

  return {
      props: {
          reports: reports
      }
  }
}
