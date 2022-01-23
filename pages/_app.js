import '../styles/globals.css'
import Head from 'next/head'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Router from 'next/router';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 400,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"></meta>
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
