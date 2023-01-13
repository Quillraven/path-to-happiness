import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeContext, ThemeType } from "../context/themeContext";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useState } from "react";
import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
                                                       Component,
                                                       pageProps: { session, ...pageProps }
                                                     }) => {

  const [theme, setTheme] = useState(ThemeType.LIGHT);

  return (
    <>
      <Head>
        <title>Path to Happiness</title>
        <meta name="description" content="View the wishes of the world to become happy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={session}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div data-theme={theme} className={"flex flex-col items-center w-full h-screen"}>
            <Header />

            <Component {...pageProps} />

            <Footer />
          </div>
        </ThemeContext.Provider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
