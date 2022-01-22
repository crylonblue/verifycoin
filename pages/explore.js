import Head from 'next/head'
import styles from '../styles/Explore.module.css'
import Navigation from '../components/navigation.component'
import { sanityClient } from '../sanity'
import ListItem from '../components/listItem.component'
import Footer from '../components/footer.component'

export default function Explore(props) {
  const {reports} = props
  return <div className={styles.container}>
    <Head>
      <title>Explore reports</title>
      <meta name="description" content="Explore all our reports" />
    </Head>
    <section className={styles.main}>
      <Navigation></Navigation>
      <section className={styles.explore}>
          {
            reports.map((report, i) => {
              return <ListItem report={report} key={i} />
            })
          }
      </section>
    </section>
    <Footer></Footer>
  </div>
}


export const getServerSideProps = async (pageContext) => {
  const query = `*[_type == "report"] | order(title) {title, tags, image, slug} [0..25]`
  const reports = await sanityClient.fetch(query)

  if (!reports) {
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