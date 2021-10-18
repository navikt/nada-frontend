import DataProductLogo from '../lib/icons/dataProductLogo'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import DataPackageLogo from '../lib/icons/dataPackageLogo'
import { SearchResultProps } from './searchresult'
import IconBox from '../lib/icons/iconBox'

export const ResultIcon = ({ result }: SearchResultProps) => {
  const iconMap = {
    Collection: <DataProductLogo size={64} />,
    dataproduct: <BigQueryLogo size={64} />,
    datapackage: <DataPackageLogo size={64} />,
  }

  if (result.type && result.type in iconMap)
    return <IconBox>{iconMap[result.type]}</IconBox>

  return <DataProductLogo size={64} />
}
