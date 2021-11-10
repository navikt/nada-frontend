import styled from 'styled-components'

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  width: 550px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-evenly;
`
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 140px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: 4px;
  border: 1px solid rgb(240, 240, 240);
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
`

/*
      <Categories>
        <CategoryCard>
          <ProductLogo size={60} />
          <i>Produkter</i>
        </CategoryCard>
        <CategoryCard>
          <CollectionLogo size={60} />
          <i>Samlinger</i>
        </CategoryCard>
        <a
          href={'https://datapakker.intern.nav.no'}
          target="_blank"
          rel="noreferrer"
        >
          <CategoryCard>
            <DatapakkerLogo />
            <ExternalLink style={{ marginTop: '-25px', color: '#5ac4ff' }} />
          </CategoryCard>
        </a>
      </Categories>
      */
