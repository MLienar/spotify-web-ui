import styled from "styled-components";
import Image from "next/image";

type Props = {
    type: string;
    src?: string | any;
    onClick?: (e: React.MouseEvent) => void;
};

const Circle = styled.div<Props>`
    transform: ${(props) =>
        props.type === "previous" ? `rotate(180deg)` : ""};
    border: 2px solid grey;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) =>
        props.type === "play"
            ? "clamp(30px, 4vw, 40px)"
            : "clamp(25px, 3vw, 33px)"};
    height: ${(props) =>
        props.type === "play"
            ? "clamp(30px, 4vw, 40px)"
            : "clamp(25px, 3vw, 33px)"};
    margin: 0 5px;
    cursor: pointer;
    &:hover {
        border: 2px solid white;
        transition: all 0.2s ease-out;
    }
`;

const Icon = styled(Image)`
    filter: brightness(0) invert(1);
    margin: auto;
    transition: all 0.2 ease-in;
`;

export default function Control(props: Props) {
    return (
        <Circle type={props.type} onClick={props.onClick}>
            {props.type === "play" ? (
                <Icon src={props.src} height="16px" width="12px" />
            ) : (
                <Icon src={props.src} height="12px" width="12px" />
            )}
        </Circle>
    );
}
