import "../styles/globals.css";
import { SessionProvider as AuthProvider } from "next-auth/react";
import Head from "next/head";
import Header from "../components/header/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AuthProvider session={session}>
      <Head>
        <title>Augur</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
