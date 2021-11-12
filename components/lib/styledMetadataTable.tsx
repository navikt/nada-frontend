import styled from 'styled-components'
import { navLillaLighten60 } from '../../styles/constants'

const StyledMetadataTable = styled.table`
  background-color: ${navLillaLighten60};
  width: 100%;
  font-size: 16px;
  line-height: 1;

  padding: 0.5rem;

  th,
  td {
    padding: 3px 5px;
  }

  th {
    text-align: right;
    padding-left: 15px;
    width: 1px;
  }

  .navds-card__micro {
    margin-right: 7px;
    text-transform: uppercase;
    font-weight: bold;
  }
`
export default StyledMetadataTable
