import { TagComponentProps } from 'react-tag-autocomplete'
import styled from 'styled-components'
import { Close } from '@navikt/ds-icons'
import { navBlaLighten20, navBlaLighten60 } from '../../styles/constants'

export const ReactTagKeywordShim = ({ tag, onDelete }: TagComponentProps) => (
  <Keyword
    onClick={onDelete}
    keyword={
      <>
        <Close style={{ marginRight: '4px' }} /> {tag.name}
      </>
    }
  />
)

interface KeywordProps {
  keyword: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const KeywordButton = styled.button`
  border: none;
  border-radius: 1rem;
  background-color: ${navBlaLighten60};
  border: 2px solid ${navBlaLighten20};

  :hover {
    background-color: white;
    border: 2px solid ${navBlaLighten60};
  }

  padding: 4px 10px 4px 8px;
  margin-right: 5px;
  div {
    display: flex;
    align-items: center;
  }
`

export const Keyword = ({ keyword, onClick }: KeywordProps) => (
  <KeywordButton onClick={onClick}>
    <div>{keyword}</div>
  </KeywordButton>
)

export default Keyword
