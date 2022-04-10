import Logo from './navbar/logo'
import styled from 'styled-components'
import TopItems from './navbar/topItems'
import NavPlaylist from './navbar/navPlaylist'
import { Playlist } from '../../services/types'
const Nav = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 30px;
  position: absolute;
  background: #121124;
  height: 100%;
  z-index: 4;
`

export default function Navbar() {
  return (
    <Nav>
      <Logo />
      <TopItems />
      <NavPlaylist />
    </Nav>
  )
}
