const CollectionLogo = () => <img src="/result-icons/datacollection.svg" />
const ProductLogo = () => <img src="/result-icons/dataproduct.svg" />

export const logoMap: Record<string, React.ReactNode> = {
  Collection: <CollectionLogo />,
  datapackage: <CollectionLogo />,
  Dataproduct: <ProductLogo />,
}
