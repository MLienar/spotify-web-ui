import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import {
  ReactElement,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from "react";
import { AppWrapper, AppContext } from "../services/context";
import App from "next/app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
}

export default MyApp;
