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
`;

const Length = styled(Date)`
  color: #ffffff5c;
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
