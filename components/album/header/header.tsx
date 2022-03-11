import styled from "styled-components";
import Artwork from "../artwork";
import AlbumDetails from "./albumDetails";
import { useContext, useEffect, useRef } from "react";
import AlbumContainer from "../../common/albumContainer";
import { useIsomorphicLayoutEffect } from "react-use";
import gsap from "gsap";
import Flip from "gsap/dist/Flip";
import { AppContext } from "../../../services/context";

gsap.registerPlugin(Flip);

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  width: 100%;
  padding: 50px;
  position: relative;
`;

const TextPart = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-self: center;
  width: clamp(300px, 50vw, 700px);
  gap: 25px;
`;

const Artist = styled.p`
  text-transform: uppercase;
  font-size: 1.3rem;
  color: #ffffffa9;
  letter-spacing: 2px;
  opacity: 0,
  transform: translateX(100%);
  clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
`;

const AlbumTitle = styled.h1`
opacity: 0,
  transform: translateX(100%);
  font-size: 4rem;
  clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
`;

interface Props {
  artwork: string;
  title: string;
  artist: string;
  date: string;
  length: number;
  albumUrl: string | string[] | undefined;
}

export default function Header({
  artwork,
  title,
  artist,
  date,
  length,
  albumUrl,
}: Props) {
  const ref = useRef(null);
  const r = gsap.utils.selector(ref);
  const { animateAlbum, setAnimateAlbum } = useContext(AppContext);

  useIsomorphicLayoutEffect(() => {
    console.log("yo");

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "Power3.easeOut",
        duration: 1,
      },
    });

    tl.to(r(".album-container"), {
      y: 0,
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: 1.3,
      opacity: 1,
      scale: 1,
    })
      .to(
        r(".text-reveal"),
        {
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        "-=1.5"
      )
      .to(
        r(".details span"),
        {
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        },
        "-=1"
      )
      .to(r(".text-reveal"), {
        duration: 1,
        opacity: 0,
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      })
      .to(
        r(".details"),
        {
          duration: 1,
          opacity: 0,
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        "<"
      )
      .to(
        r(".album-container"),
        {
          y: 0,
          clipPath: "polygon(0% 100%, 0% 100%, 0% 0%, 0% 0%)",
          duration: 1.4,
          opacity: 0,
        },
        "-=0.9"
      )
      .to(
        ref.current,
        {
          padding: "0 25px",
          duration: "0.1",
        },
        ">"
      )
      .to(
        r(".album-container"),
        {
          height: "clamp(200px, 15vh, 400px)",
          duration: 0.1,
        },
        "<"
      )
      .to(
        r(".text-part"),
        {
          gap: "10px",
          duration: 0.1,
          alignSelf: "flex-end",
        },
        "<"
      )
      .to(
        r("h1.text-reveal"),
        {
          fontSize: "2rem",
          duration: 0.1,
        },
        "<"
      )
      .to(
        r("p.text-reveal"),
        {
          fontSize: "1rem",
          duration: 0.1,
        },
        "<"
      )
      .to(
        r(".album-container"),
        {
          x: 0,
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1,
          opacity: 1,
          scale: 1,
        },
        ">"
      )
      .to(
        r(".text-reveal"),
        {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
        },
        "<"
      )
      .to(
        r(".details"),
        {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
        },
        "<"
      );
    if (animateAlbum) {
      tl.play();
      setAnimateAlbum(false);
    } else tl.seek(tl.duration());
  }, []);

  return (
    <Container className="album-header" ref={ref}>
      <AlbumContainer additionalClass="album-container new">
        <Artwork src={artwork} alt={title} priority />
      </AlbumContainer>

      <TextPart className="text-part">
        <Artist className="text-reveal">{artist}</Artist>
        <AlbumTitle className="text-reveal"> {title}</AlbumTitle>
        <AlbumDetails date={date} length={length} />
      </TextPart>
    </Container>
  );
}
