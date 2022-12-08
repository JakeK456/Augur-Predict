import "../styles/globals.css";
import { SessionProvider as AuthProvider } from "next-auth/react";
import Header from "../components/header/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AuthProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
