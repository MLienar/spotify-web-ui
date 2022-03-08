import { Tracks, Track } from "../../../services/types";
import styled from "styled-components";
import TrackItem from "./trackItem";
import { useRef, useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 0 50px;
  margin-bottom: 50px;
  opacity: 0;
`;

interface Props {
  tracks: Tracks;
}

export default function TrackList({ tracks }: Props) {
  return (
    <Container>
      {tracks.items.map((track) => (
        <TrackItem
          title={track.name}
          artists={track.artists}
          duration={track.duration_ms}
          preview={track.preview_url}
          key={track.id}
        />
      ))}
    </Container>
  );
}
