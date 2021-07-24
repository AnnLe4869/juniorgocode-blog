import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { useEffect } from "react";
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
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
