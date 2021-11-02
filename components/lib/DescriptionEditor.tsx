import dynamic from 'next/dynamic'
import { useController, UseControllerProps } from 'react-hook-form'
import styled from 'styled-components'
import Link from 'next/link'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type DescriptionEditorProps<T> = { label: string } & UseControllerProps<T>

const MarkdownNotice = styled.span`
  margin-left: 1em;
  color: #555;
  font-style: italic;
`

const MDEditorNAVLook = styled(MDEditor)`
  margin-top: 8px;
  border: 1px solid black;
  box-shadow: none;
`

export const DescriptionEditor = <FV extends Record<string, any>>({
  name,
  control,
  label,
}: DescriptionEditorProps<FV>) => {
  const {
    field: { ...inputProps },
  } = useController({
    name,
    control,
  })

  return (
    <div>
      <label
        style={{ display: 'inline' }}
        htmlFor={name}
        className={'navds-text-field__label navds-label'}
      >
        {label}
      </label>
      <MarkdownNotice>
        formattering i Markdown,{' '}
        <Link href={'https://guides.github.com/features/mastering-markdown/'}>
          se innføring
        </Link>
      </MarkdownNotice>
      <MDEditorNAVLook
        {...inputProps}
        className={'navds-body-short navds-body-medium'}
        style={{}}
      />
    </div>
  )
}

export default DescriptionEditor
