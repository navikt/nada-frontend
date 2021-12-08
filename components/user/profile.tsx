import styled from 'styled-components'
import { People } from '@navikt/ds-icons'

interface ProfileProps {
  username: string
  groups: { email: string; name: string }[]
}

const UserImage = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  background-color: #dadada;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`
const capitalizeAllFirstLetters = (words: string) => {
  return words
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1) + ' ')
}
const Profile = ({ username, groups }: ProfileProps) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserImage>
          <People height={70} width={70} color={'#222'} />
        </UserImage>
        <h1>{capitalizeAllFirstLetters(username)}</h1>
      </div>
      <hr />
      <h4>Grupper</h4>
      <ul>
        {groups.map((g) => (
          <li key={g.name}>{g.name}</li>
        ))}
      </ul>
    </div>
  )
}
export default Profile
