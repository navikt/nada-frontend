import { AddCircleFilled, AutomaticSystem } from '@navikt/ds-icons'
import { navBla, navBlaLighten80, navGronn } from '../../../styles/constants'
import styled from 'styled-components'
import { CollectionQuery } from '../../../lib/schema/graphql'
import Link from 'next/link'

const Container = styled.div`
  border: 2px solid #aaa;
  border-radius: 5px;
  margin: 0.5rem;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  cursor: pointer;
  :hover {
    background-color: ${navBlaLighten80};
  }

  svg {
    font-size: 32px;
  }

  .modifyProducts {
    color: ${navBla};
  }

  .addProducts {
    color: ${navGronn};
  }
`

interface DataproductsEditButtonProps {
  collection: CollectionQuery['collection']
}

const DataproductsEditButton = ({ collection }: DataproductsEditButtonProps) =>
  collection.elements.length ? (
    <Link href={`/collection/${collection.id}/products`}>
      <Container>
        <AutomaticSystem className={'modifyProducts'} />
        <div>Oppdater produkter</div>
      </Container>
    </Link>
  ) : (
    <Link href={`/collection/${collection.id}/products`}>
      <Container>
        <AddCircleFilled className={'addProducts'} />
        <div>Legg til dataprodukter</div>
      </Container>
    </Link>
  )

export default DataproductsEditButton
