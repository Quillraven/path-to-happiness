import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeContext, ThemeType } from "../context/themeContext";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [theme, setTheme] = useState(ThemeType.LIGHT);

  return (
    <SessionProvider session={session}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div data-theme={theme}>
          <Component {...pageProps} />
        </div>
      </ThemeContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
