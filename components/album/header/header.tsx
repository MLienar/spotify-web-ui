import styled from "styled-components";
import Artwork from "../artwork";
import AlbumDetails from "./albumDetails";
import { useEffect, useRef } from "react";
import AlbumContainer from "../../common/albumContainer";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 100px;
  position: relative;
`;

const TextPart = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 25px;
`;

const Artist = styled(motion.p)`
  text-transform: uppercase;
  font-size: 1.3rem;
  color: #ffffffa9;
  letter-spacing: 2px;
`;

const AlbumTitle = styled(motion.h1)`
  font-size: 4rem;
`;

interface Props {
  artwork: string;
  title: string;
  artist: string;
  date: string;
  length: number;
}

export default function Header({
  artwork,
  title,
  artist,
  date,
  length,
}: Props) {
  return (
    <Container className="album-header">
      <AlbumContainer>
        <Artwork src={artwork} alt={title} priority />
      </AlbumContainer>

      <TextPart className="text-part">
        <Artist className="text-reveal" initial={{ opacity: 0 }}>
          {artist}
        </Artist>
        <AlbumTitle className="text-reveal" initial={{ opacity: 0 }}>
          {" "}
          {title}
        </AlbumTitle>
        <AlbumDetails date={date} length={length} />
      </TextPart>
    </Container>
  );
}
