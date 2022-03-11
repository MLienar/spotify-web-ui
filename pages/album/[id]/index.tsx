import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../../../components/layout";
import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../services/context";
import { useRouter } from "next/router";
import { Album as AlbumType } from "../../../services/types";
import styled from "styled-components";
import Header from "../../../components/album/header/header";
import TrackList from "../../../components/album/tracklist/trackList";
import Gallery from "../../../components/gallery/gallery";
import gsap from "gsap";

const Container = styled.div`
  padding: 50px;
`;

const Title = styled.h2`
  padding: 0 25px;
  margin-bottom: 25px;
`;

interface Props {
  albumId: string;
}

const Album = () => {
  const router = useRouter();
  const { id } = router.query;
  const { timeline } = useContext(AppContext);
  const ref = useRef(null);
  const r = gsap.utils.selector(ref);

  useEffect(() => {}, [id]);

  const value = useContext(AppContext);
  let { token } = value.state;

  const [data, setData] = useState<AlbumType | null>(null);

  useEffect(() => {
    if (token && id) {
      axios
        .get(`https://api.spotify.com/v1/albums/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, id]);

  return (
    <Container className="album-page" ref={ref}>
      {data && (
        <>
          <Header
            artwork={data.images[0].url}
            title={data.name}
            artist={data.artists[0].name}
            date={data.release_date}
            length={data.total_tracks}
            albumUrl={id}
          />
          <TrackList tracks={data.tracks} />
          <Title>More from {data.artists[0].name}</Title>
          <Gallery subject={data.artists[0].name} order={1} />
        </>
      )}
    </Container>
  );
};

export default Album;

Album.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
