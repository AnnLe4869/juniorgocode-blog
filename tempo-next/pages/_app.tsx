import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // *The useEffect part is needed for using Material-UI with NextJS
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      // We kind of by-pass typescript check here since we want to delete the element itself
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <CssBaseline />

      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="keywords"
          content="programming, junior, web development, javascript"
        />

        <link rel="icon" href="/favicon/favicon.ico" />

        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      </Head>
      <AppHeader />
      <Component {...pageProps} />
      <AppFooter />
    </>
  );
}
export default MyApp;
