import DataproductCard from './DataproductCard'
import { CollectionQuery, Group } from '../../../lib/schema/graphql'
import styled from 'styled-components'
import amplitudeLog from '../../../lib/amplitude'
import Link from 'next/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from '@mui/material/Avatar'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import { useContext } from 'react'
import { UserState } from '../../../lib/context'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

const Container = styled.div`
  padding: 1rem 0.5rem 0 0.5rem;
`

export const DataproductList = ({ collection }: DataproductListProps) => {
  const userState = useContext(UserState)
  const isOwner =
    userState?.groups.some((g: Group) => {
      return g.email === collection?.owner.group
    }) || false

  return (
    <Container
      onClick={() => {
        const eventProperties = {
          fra: `collection-${collection.name}`,
        }
        amplitudeLog('navigere', eventProperties)
      }}>
      <List>
        {collection?.elements.map((d) => (
          <Link href={`/dataproduct/${d.id}`} key={d.id}>
            <ListItem
              secondaryAction={
                isOwner &&
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <BigQueryLogo />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={d.name}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Container>
  )
}

export default DataproductList
