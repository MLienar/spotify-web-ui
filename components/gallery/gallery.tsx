import styled from "styled-components";
import Album from "../album/album";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { useIsomorphicLayoutEffect } from "react-use";
import { AppContext } from "../../services/context";
import { motion } from "framer-motion";

const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

const GallerySlide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: clamp(500px, 100%, 80vw);
  overflow-x: auto;
  gap: 2.5%;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  text-transform: capitalize;
  opacity: 0;
  transform: translateY(100%);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ProfilePic = styled(Image)`
  border-radius: 50px;
  transform: scale(0.5) translateY(100%);
  opacity: 0;
`;

interface Props {
  subject: string;
  profilePic: string;
}

export default function Gallery({ subject, profilePic }: Props) {
  const [data, setData] = useState([]);
  const [isInView, setIsInView] = useState<boolean | undefined>(false);
  const value = useContext(AppContext);

  const params = {
    q: `${subject}`,
    type: "album",
    limit: 4,
  };

  useEffect(() => {
    let { token } = value.state;
    if (token) {
      axios
        .get(`https://api.spotify.com/v1/search`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        })
        .then((response) => {
          setData(response.data.albums.items);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 },
  };

  return (
    <Container className="gallery">
      <TitleContainer>
        <ProfilePic
          src={profilePic}
          width={30}
          height={30}
          className="profile-pic"
        />
        <Title>{subject}</Title>
      </TitleContainer>
      <GallerySlide>
        {data.length > 0 &&
          data.map((album: any) => (
            <Album
              url={album.id}
              src={album.images[0].url}
              title={album.name}
              key={album.id}
              variants={item}
            />
          ))}
      </GallerySlide>
    </Container>
  );
}
