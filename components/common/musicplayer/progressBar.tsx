import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Minutes = styled.p`
  color: #999999;
  font-size: 0.7rem;
`;

const Bar = styled.div`
  height: 3px;
  width: clamp(250px, 30vw, 500px);
  background: #2f2f2f;
  border-radius: 5px;
  margin: 0 10px;
  position: relative;
`;

const Progress = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  background: white;
  border-radius: 5px;
`;
type Props = {
  currentTime?: string;
  duration?: string;
  ratio: number;
};

export default function ProgressBar(props: Props) {
  return (
    <Container>
      <Minutes>{props.currentTime}</Minutes>
      <Bar>
        <Progress style={{ width: props.ratio + "%" }}></Progress>
      </Bar>
      <Minutes>{props.duration}</Minutes>
    </Container>
  );
}
