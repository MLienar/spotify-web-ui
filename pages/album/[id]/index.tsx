import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../../../components/layout";
import { ReactElement, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../../services/context";
import Link from "next/link";
import { useRouter } from "next/router";
import { Album as AlbumType } from "../../../services/types";
import styled from "styled-components";
import Header from "../../../components/album/header/header";
import TrackList from "../../../components/album/tracklist/trackList";
import { motion } from "framer-motion";

interface Props {
  albumId: string;
}

const Album = () => {
  const router = useRouter();
  const { id } = router.query;

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
    <motion.div initial="initial" animate="animate" exit="exit">
      {data && (
        <>
          <Header
            artwork={data.images[0].url}
            title={data.name}
            artist={data.artists[0].name}
            date={data.release_date}
            length={data.total_tracks}
          />
          <TrackList tracks={data.tracks} />
        </>
      )}
    </motion.div>
  );
};

export default Album;

Album.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
