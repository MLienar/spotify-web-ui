import Image from "next/image";
import styled from "styled-components";
import userIcon from "../../../public/images/user.png";

interface Props {
  src?: string | StaticImageData;
}

const Container = styled.div`
  padding: 5px;
  border-radius: 50px;
  height: 30px;
  flex: 0 0 auto;
  width: 30px;
  background: #635e8b;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(Image)``;

export default function ProfilePicture({ src = userIcon }: Props) {
  return (
    <Container>
      <Icon src={src} width={20} height={20} />
    </Container>
  );
}
