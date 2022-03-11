import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { FavItems } from "../services/types";
import { useRef, ReactElement, useEffect, useState, useContext } from "react";
import { AppContext } from "../services/context";
import Login from "../components/login/login";
import axios from "axios";
import Gallery from "../components/gallery/gallery";
import styled from "styled-components";
import gsap from "gsap";

const Container = styled.div`
  padding: 50px;
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

const Home = () => {
  const value = useContext(AppContext);
  let { token } = value.state;
  // let albumGotClicked = value.albumGotClicked;
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState<FavItems[]>([]);

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  return (
    <>
      {token ? (
        <Container>
          <h1>Your top artists</h1>
          {data.length > 0 &&
            data.map((artist: FavItems, index) => (
              <Gallery
                subject={artist.name}
                profilePic={artist.images[2].url}
                key={artist.id}
                order={index}
              />
            ))}
        </Container>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
