import '../styles/globals.css'
import Head from 'next/head'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 400,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', (url) => {
  NProgress.done()
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GTM-KM58M3J', {
      page_path: url,
    });
  }
});

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
