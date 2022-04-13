import styled from "styled-components";

interface Props {
  date: string;
  length: number;
}

const Detail = styled.span`
  transform: translateY(100%);
`;

const Date = styled(Detail)`
  color: #ffffffa9;
  font-size: 1rem;
  clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
`;

const Length = styled(Date)`
  color: #ffffff5c;
  clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
`;

export default function AlbumDetails({ date, length }: Props) {
  return (
    <>
      {/* <img src={profilePic} alt={artist} /> */}
      <p className="details">
        <Date> {date} •</Date>
        <Length> {length} tracks</Length>
      </p>
    </>
  );
}
