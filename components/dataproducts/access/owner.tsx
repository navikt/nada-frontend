interface OwnerProps {
  product: any
}

const Owner = ({ product }: OwnerProps) => {
  return (
    <>
      name: {product.name}
      requesters: {product.requesters}
      access: {product.access}
    </>
  )
}


export default Owner

