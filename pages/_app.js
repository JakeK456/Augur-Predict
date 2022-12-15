import "../styles/globals.css";
import { SessionProvider as AuthProvider } from "next-auth/react";
import Head from "next/head";
import Header from "../components/header/Header";
import { ProfileProvider } from "hooks/ProfileProvider";

function Application({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AuthProvider session={session}>
      <ProfileProvider>
        <Head>
          <title>Augur</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default Application;
