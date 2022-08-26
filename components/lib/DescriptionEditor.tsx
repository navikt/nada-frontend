import dynamic from 'next/dynamic'
import { useController, UseControllerProps } from 'react-hook-form'
import Link from 'next/link'
import { Loader } from '@navikt/ds-react'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="h-48 mt-2 w-full 2xl:w-[64rem] flex items-center justify-center border border-border rounded">
      <Loader size="2xlarge" />
    </div>
  ),
})

type DescriptionEditorProps<T> = { label: string } & UseControllerProps<T>

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
      <MDEditor
        className="w-full 2xl:w-[64rem] navds-body-short navds-body-medium mt-2 border border-border shadow-none"
        {...inputProps}
        style={{}}
      />
    </div>
  )
}

export default DescriptionEditor
