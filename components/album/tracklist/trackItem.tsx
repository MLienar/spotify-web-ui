import { Artist } from "../../../services/types";
import styled from "styled-components";
import Play from "/public/images/play.png";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background: #fefefe18;
    transition: all 0.3s ease-out;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const ArtistList = styled.ul`
  color: #ffffff8d;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  li {
    margin: 0 12px;
    white-space: nowrap;
    &:nth-child(1) {
      list-style: none;
      margin: 0 12px 0 0;
    }
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
`;

const Duration = styled.p`
  color: #ffffff8d;
`;

const PlayIcon = styled.span`
  height: clamp(30px, 5vh, 60px);
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px;
  background: white;
  border-radius: 50px;
  position: relative;
  span {
    transform: translateX(12%);
  }
  &:hover {
    background: #635e8b;
    transition: all 0.2s ease-out;
    img  {
      filter: brightness(0) invert(1);
      transition: all 0.2s ease-out;
    }
  }
`;

interface Props {
  title: string;
  artists: Artist[];
  duration: number;
  preview: string;
}

export default function TrackItem({
  title,
  artists,
  duration,
  preview,
}: Props) {
  return (
    <Container className="track-item">
      <TrackInfo>
        <h2>{title}</h2>
        <ArtistList>
          {artists.map((artist) => (
            <li key={artist.name}>{artist.name}</li>
          ))}
        </ArtistList>
      </TrackInfo>
      <Details>
        <Duration>{new Date(duration).toISOString().slice(14, 19)}</Duration>
        <PlayIcon>
          <Image src={Play} layout="intrinsic" />
        </PlayIcon>
      </Details>
    </Container>
  );
}