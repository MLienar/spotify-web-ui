import styled from "styled-components";

interface Props {
  name: string;
}

const Name = styled.p`
  font-size: 0.9rem;
  flex: 0 1 auto;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: clamp(50px, 10vw, 140px);
`;

export default function ProfileName({ name }: Props) {
  return <Name>{name}</Name>;
}
