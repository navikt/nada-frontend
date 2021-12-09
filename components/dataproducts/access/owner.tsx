interface OwnerProps {
  product: any
}

const Owner = ({ product }: OwnerProps) => {

  const access = product.access
  const requesters = product.requesters
  const name = product.name

  return (<>access: {requesters}</>)
}


export default Owner

