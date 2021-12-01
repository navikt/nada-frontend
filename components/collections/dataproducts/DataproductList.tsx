import {
  CollectionElementType,
  CollectionQuery,
  Group,
  useRemoveFromCollectionMutation,
} from '../../../lib/schema/graphql'
import styled from 'styled-components'
import amplitudeLog from '../../../lib/amplitude'
import Link from 'next/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import * as React from 'react'
import { useContext } from 'react'
import { UserState } from '../../../lib/context'
import IconBox from '../../lib/icons/iconBox'
import { navBlaLighten80 } from '../../../styles/constants'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

const Container = styled.div`
  padding: 1rem 0.5rem 0 0.5rem;
`
const StyledListItem = styled(ListItem)`
  cursor: pointer;
  :hover {
    background-color: ${navBlaLighten80}
  }
`

export const DataproductList = ({ collection }: DataproductListProps) => {
  const userState = useContext(UserState)
  const isOwner =
    userState?.groups.some((g: Group) => {
      return g.email === collection?.owner.group
    }) || false


  const [removeFromCollection] = useRemoveFromCollectionMutation()

  const handleRemoveFromCollection = (id: string) => {
    removeFromCollection({
      variables: {
        id: collection.id,
        elementID: id,
        elementType: CollectionElementType.Dataproduct,
      },
      awaitRefetchQueries: true,
      refetchQueries: ['Collection'],
    })
  }

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
            <StyledListItem
              secondaryAction={
                isOwner &&
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon onClick={(e) => {
                    e.preventDefault()
                    handleRemoveFromCollection(d.id)
                  }} />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <IconBox size={42}>
                  <BigQueryLogo />
                </IconBox>
              </ListItemAvatar>
              <ListItemText
                primary={d.name}
              />
            </StyledListItem>
          </Link>
        ))}
      </List>
    </Container>
  )
}

export default DataproductList
