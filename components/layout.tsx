import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Navbar from "./common/navbar";
import MusicPlayer from "./common/musicplayer";
import ProfilePill from "./common/profilePill/profilePill";
import { useEffect, useContext, useRef, useState } from "react";
import { AppContext } from "../services/context";
import { useIsomorphicLayoutEffect } from "react-use";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 9fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
  width: 100vw;
`;

const Main = styled.main`
  grid-area: 1 / 2 / 2 / 3;
  max-height: 90vh;
  overflow-y: scroll;
  gap: 30px;
  display: flex;
  flex-flow: column nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Layout({
  children,
  title = "Spotify Web Player",
}: Props) {
  const value = useContext(AppContext);

  useEffect(() => {
    const hash: string = window.location.hash;
    let newToken = window.localStorage.getItem("token");
    if (hash && !newToken) {
      //@ts-ignore
      newToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", newToken);
    }
    value.setToken(newToken);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Body>
        <Navbar />
        <ProfilePill />
        <Main>{children}</Main>

        <MusicPlayer />
      </Body>
    </>
  );
}