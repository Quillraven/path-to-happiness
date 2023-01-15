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
  pageProps: { session, ...pageProps },
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
          <div data-theme={theme} className={"flex h-screen w-full flex-col items-center"}>
            <Header />
            {/* div to fill up space of fixed header */}
            <div className={"w-full pb-36 lg:pb-24"} />

            <Component {...pageProps} />

            <Footer />
            {/* div to fill up space of fixed footer */}
            <div className={"w-full pt-40"} />
          </div>
        </ThemeContext.Provider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
