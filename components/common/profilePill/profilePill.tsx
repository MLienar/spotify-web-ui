import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../services/context";
import axios from "axios";
import LogoutButton from "./logoutButton";
import ProfilePicture from "./profilePicture";
import ProfileName from "./profileName";
import { useRouter } from "next/router";

interface ProfileData {
  display_name: string;
  id: string;
  images: [];
}

const Container = styled.div`
  position: fixed;
  top: 50px;
  right: 50px;
  display: flex;
  /* border: 2px #635e8b solid; */
  background: #222130;
  padding: 3px 15px 3px 3px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
  width: clamp(100px, 15vw, 150px);
  text-overflow: ellipsis;
  z-index: 10;
`;

export default function ProfilePill() {
  const [hover, setHover] = useState(false);
  const [data, setData] = useState<ProfileData>({} as ProfileData);
  const value = useContext(AppContext);
  let { token } = value.state;
  const router = useRouter();

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            router.push("/");
            router.reload();
          }
        });
    }
  }, [token]);

  return (
    <Container
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {data && (
        <>
          {hover ? (
            <LogoutButton />
          ) : (
            <>
              <ProfilePicture />
              <ProfileName name={data.display_name} />
            </>
          )}
        </>
      )}
    </Container>
  );
}
