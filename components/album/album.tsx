import styled from "styled-components";
import Link from "next/link";
import Artwork from "./artwork";
import React, { useContext } from "react";
import AlbumContainer from "../common/albumContainer";
import { motion } from "framer-motion";

const Container = styled(motion.a)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 23%;
  min-width: 23%;
  gap: 10px;
  cursor: pointer;
  position: relative;
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Props {
  url: string;
  src: string | StaticImageData;
  title: string;
  variants: {};
}

const transition = {
  duration: 1,
  delay: 0.5,
};

export default function Album({ url, src, title, variants }: Props) {
  const albumLink = `/album/${url}`;

  return (
    <Link href={albumLink}>
      <Container className="album-link-container" variants={variants}>
        <AlbumContainer>
          <Artwork src={src} alt={title} />
        </AlbumContainer>
        <Title>{title}</Title>
      </Container>
    </Link>
  );
}
