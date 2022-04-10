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
  background: #121124;
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
