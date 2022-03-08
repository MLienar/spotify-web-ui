import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../../services/context";
import { useRouter } from "next/router";

const Button = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  border: 2px solid #a32a2a;
  color: #a32a2a;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 600;
`;

const Prompt = styled.p`
  color: #f14646;
  margin: auto;
`;

export default function LogoutButton() {
  const context = useContext(AppContext);
  const router = useRouter();

  const logOut = () => {
    window.localStorage.removeItem("token");
    context.setToken(null);
    router.push("/");
  };

  return (
    <Button onClick={logOut}>
      <Icon>!</Icon>
      <Prompt>Log Out</Prompt>
    </Button>
  );
}
