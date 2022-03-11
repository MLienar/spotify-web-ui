import styled from "styled-components";
import Album from "./album";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { useIsomorphicLayoutEffect, useIntersection } from "react-use";
import { AppContext } from "../../services/context";
import gsap from "gsap";
import checkIfInView from "../../services/checkIfInView";
import useOnScreen from "../../hooks/useOnScreen";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  height: 30vh;
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
  transform: translateY(50%);
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
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
  profilePic?: string | null;
  order: number;
}

export default function Gallery({ subject, profilePic = null, order }: Props) {
  const [data, setData] = useState([]);
  const value = useContext(AppContext);
  const ref = useRef(null);
  const r = gsap.utils.selector(ref);
  const tl = useRef<any>();
  const inView = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0.001,
  });

  // const [isInView, setIsInView] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (data.length > 1) {
      tl.current = gsap
        .timeline({
          defaults: {
            duration: 1,
            ease: "Power3.easeOut",
          },
        })
        .to(ref.current, {
          height: "unset",
          duration: 0.1,
          delay: 1,
        })
        .to(
          r(".album-container"),
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 0.8,
            stagger: 0.2,
            scale: 1,
          },
          "<"
        )
        .to(
          r(".profile-pic"),
          {
            opacity: 1,
            scale: 1,
            y: 0,
          },
          "-=1.5"
        )
        .to(
          r("h2"),
          {
            opacity: 1,
            y: 0,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          },
          "-=1.5"
        )
        .to(r("h3"), {
          opacity: 1,
        });

      if (order < 4) {
        tl.current.play();
      } else {
        tl.current.seek(tl.current.duration());
      }
    }
  }, [data]);

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

  useEffect(() => {
    if (inView?.isIntersecting) {
      console.log(inView, subject);
    }
    // setIsInView(inView);
  }, [inView]);
  return (
    <Container className="gallery" ref={ref}>
      {profilePic && (
        <TitleContainer>
          <ProfilePic
            src={profilePic}
            width={30}
            height={30}
            className="profile-pic"
          />
          <Title>{subject}</Title>
        </TitleContainer>
      )}
      <GallerySlide>
        {data.length > 0 &&
          data.map((album: any) => (
            <Album
              url={album.id}
              src={album.images[0].url}
              title={album.name}
              key={album.id}
            />
          ))}
      </GallerySlide>
    </Container>
  );
}
