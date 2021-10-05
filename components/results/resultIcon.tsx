import DataProductLogo from '../lib/icons/dataProductLogo'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import DataPackageLogo from '../lib/icons/dataPackageLogo'
import { SearchResultProps } from './searchresult'
import styled from 'styled-components'

export const ResultIcon = ({ result }: SearchResultProps) => {
  const iconMap = {
    dataproduct: <DataProductLogo />,
    dataset: <BigQueryLogo />,
    datapackage: <DataPackageLogo />,
  }

  if (result.type && result.type in iconMap) return iconMap[result.type]

  return <DataProductLogo />
}
