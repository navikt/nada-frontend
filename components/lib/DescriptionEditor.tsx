import dynamic from 'next/dynamic'
import { useController, UseControllerProps } from 'react-hook-form'
import styled from 'styled-components'
import Link from 'next/link'
import { Loader } from '@navikt/ds-react'

const MDEditorPlaceholder = styled.div`
  height: 200px;
  margin-top: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 3px;
`

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <MDEditorPlaceholder>
      <Loader size="2xlarge" />
    </MDEditorPlaceholder>
  ),
})

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
      <div className="flex flex-col">
        <label
          style={{ display: 'inline' }}
          htmlFor={name}
          className={'navds-text-field__label navds-label'}
        >
          {label}
        </label>
        <span className="italic text-[#555]">
          Formattering i Markdown,{' '}
          <Link href={'https://guides.github.com/features/mastering-markdown/'}>
            se innføring
          </Link>
        </span>
      </div>
      <MDEditorNAVLook
        {...inputProps}
        className={'navds-body-short navds-body-medium'}
        style={{}}
      />
    </div>
  )
}

export default DescriptionEditor
