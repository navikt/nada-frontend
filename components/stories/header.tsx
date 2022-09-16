interface HeaderProps {
  text: string
  size: number
}

function Header({ text, size }: HeaderProps) {
  switch (size) {
    case 1:
      return <h1 className='font-bold text-5xl'>{text}</h1>
    case 2:
      return <h2 className='font-bold text-4xl'>{text}</h2>
    case 3:
      return <h3 className='font-bold text-3xl'>{text}</h3>
    case 4:
      return <h4 className='font-bold text-2xl'>{text}</h4>
    case 5:
      return <h5 className='font-bold text-xl'>{text}</h5>
    case 6:
      return <h6 className='font-bold text-[0.625rem]'>{text}</h6>
    default:
      return <h2 className='font-bold text-4xl'>{text}</h2>
  }
}

export default Header
