import styled from 'styled-components'

const StyledMetadataTable = styled.table`
  background-color: #fafafa;
  width: 100%;
  border-top: 1px solid #dde;
  border-bottom: 1px solid #dde;
  font-size: smaller;
  margin-bottom: 20px;

  th,
  td {
    padding: 3px 5px;
  }

  th {
    text-align: right;
    padding-left: 10px;
    width: 1px;
  }

  .navds-card__micro {
    margin-right: 7px;
    text-transform: uppercase;
    font-weight: bold;
  }
`
export default StyledMetadataTable
