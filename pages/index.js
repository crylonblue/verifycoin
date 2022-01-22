import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navigation from '../components/navigation.component'
import { sanityClient } from '../sanity'
import imageUrlBuilder from '@sanity/image-url'
import CardSlider from '../components/cardSlider.component'
import SearchBar from '../components/searchBar.component'
import RoadMap from '../components/roadMap'
import TextTeaser from '../components/textTeaser'
import Footer from '../components/footer.component'


const builder = imageUrlBuilder(sanityClient)
function urlFor(source) {
    return builder.image(source)
}


export default function Home(props) {
  const {reports, comingUp} =  props;
  console.log(comingUp)
  return (
    <div className={styles.container}>
      <Head>
        <title>verifycoin</title>
        <meta name="description" content="Expert reports for cryptoprojects | verifycoin" />
      </Head>
      <section className={styles.main}>
        <Navigation></Navigation>
        <section className={styles.teaser}>
          <div className={styles.aligner}>
            <div className={styles.top}>EXPERT OPINIONS ON PROJECTS.</div>
            <div className={styles.headline}>Web3 – but easier.</div>
            <SearchBar></SearchBar>
            <div className={styles.description}>High quality reports for crypto projects.</div>
          </div>
        </section>
      </section>
      <CardSlider reports={reports} headline="Latest reviews"></CardSlider>
      <TextTeaser></TextTeaser>
      <RoadMap></RoadMap>
      <CardSlider reports={comingUp} headline="Coming up"></CardSlider>
      <Footer></Footer>
    </div>
  )
}


export const getStaticProps = async () => {
  const query = `*[_type == "report"][0..8]{title, tags, score, image, slug, riskIndicator}`
  const reports = await sanityClient.fetch(query)
  
  const comingUpQuery = `*[_type == "comingUp"][0..8]{title, image, description}`
  const comingUp = await sanityClient.fetch(comingUpQuery)

  if (!reports.length) {
      return {
          notFound: true,
          props: {}
      }
  }

  return {
      props: {
          reports: reports,
          comingUp: comingUp
      }
  }
}
