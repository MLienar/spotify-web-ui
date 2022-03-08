import Logo from "./navbar/logo";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-flow: colun nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  background: #121124;
`;

export default function Navbar() {
  return (
    <Nav>
      <Logo />
    </Nav>
  );
}
