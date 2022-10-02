import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
      <Head>
        <title>I Hear U</title>
        <meta name="description" content="MIT Hacks 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </ThemeProvider>
  );
}

export default MyApp;
