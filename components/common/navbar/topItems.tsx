import styled from 'styled-components'
import NavLink from './navLink'
import User from '../../../public/images/user.png'
import Music from '../../../public/images/music.png'
import Like from '../../../public/images/like.png'
import Heart from '../../../public/images/heart.png'
import Search from '../../../public/images/search.png'

const ItemList = styled.div`
  display: flex;
  margin: 20px 0;
  flex-flow: column nowrap;
  gap: 15px;
`

export default function TopItems() {
  return (
    <ItemList>
      <NavLink to="/" text="Top artists" image={User} />
      <NavLink to="/top-tracks" text="Top tracks" image={Music} />
      <NavLink to="/recommended" text="Recommandations" image={Like} />
      <NavLink to="/liked" text="Liked Titles" image={Heart} />
      <NavLink to="/search" text="Search" image={Search} />
    </ItemList>
  )
}
