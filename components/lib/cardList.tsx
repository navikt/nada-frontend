import styled from 'styled-components'
import Card from '@mui/material/Card'
import Link from 'next/link'
import CardHeader from '@mui/material/CardHeader'
import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import * as React from 'react'
import { UserInfoDetailsQueryResult } from '../../lib/schema/graphql'

const ProductList = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  > * {
    width: 100%;
  }
`

const StyledCard = styled(Card)`
  width: 31%;
  margin-bottom: 20px;
  padding-bottom: 20px;
  cursor: pointer;
  @media only screen and (max-width: 1024px) {
    width: 48%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  :hover {
    background-color: #fafafa;
  }
`

interface ProductProps {
  products: {
    id: string
    name: string
    owner: { group: string }
  }[]
  title: string
  excerpt?: string
}
const CardList = ({ products, title, excerpt }: ProductProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <hr />
        <br/>
      <ProductList>
        {products.map((product, idx) => (
          <Link href={`/dataproduct/${product.id}`} key={product.id}>
            <StyledCard>
              <CardHeader
                style={{ paddingBottom: '0px' }}
                avatar={
                  <IconBox size={42}>
                    <BigQueryLogo />
                  </IconBox>
                }
                titleTypographyProps={{ variant: 'h6' }}
                title={product.name}
                subheader={`eier: ${product.owner.group}`}
              />
              {excerpt ? <div>{excerpt}</div> : null}
            </StyledCard>
          </Link>
        ))}
      </ProductList>
    </div>
  )
}
export default CardList
