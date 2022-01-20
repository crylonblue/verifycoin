import Head from 'next/head'
import styles from '../styles/Explore.module.css'
import Navigation from '../components/navigation.component'
import { sanityClient } from '../sanity'
import ListItem from '../components/listItem.component'

export default function Explore(props) {
  console.log(props)
  const {reports} = props
  return <div className={styles.container}>
    <Head>
      <title>verifycoin</title>
      <meta name="description" contet="verifycoin" />
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