import Image from "next/image";
import spotifyLogo from "../../../public/images/logo.svg";
import styled from "styled-components";
import Link from "next/link";

const HomeLogo = styled(Image)`
  filter: saturate(0) brightness(200%);
`;

const LogoLink = styled.a`
  width: clamp(100px, 80%, 120px);
  height: clamp(30px, 5vh, 90px);
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;

export default function Logo() {
  return (
    <Link href="/">
      <LogoLink>
        <HomeLogo src={spotifyLogo} alt="Spotify Logo" layout="fill" />
      </LogoLink>
    </Link>
  );
}
