import { ErrorSummary } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateDataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import DataproductForm from './dataproductForm'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'

import { Dataproduct } from '../../lib/schema/graphql'
import { UpdateDataproduct } from '../../lib/schema/graphql'

interface EditDatacollectionFormProps {
  dataproduct: Dataproduct
  close: () => void
}

const EditDataproduct = ({
  dataproduct,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  // const [updateDataproduct, { data, loading, error }] =
  //   useMutation(UpdateDataproduct)
  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(updateDataproductValidation),
    defaultValues: {
      name: dataproduct.name,
      description: dataproduct.description,
      repo: dataproduct.repo,
      keywords: dataproduct.keywords,
      pii: dataproduct.pii,
    },
  })
  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }
  const { errors } = formState
  const onSubmit = (requestData: any) => {
    // const noe = updateDataproduct({
    //   variables: { id: dataproduct.id, input: { name: 'noe', pii: true } },
    // })
    setBackendError(undefined)
    close()
  }
  {
    backendError && (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DataproductForm register={register} errors={errors} watch={watch} />
      <PiiCheckboxInput register={register} watch={watch} />
      <KeywordsInput
        keywords={keywords}
        setKeywords={setKeywords}
        {...register('keywords')}
        error={errors.keywords?.[0].message}
      />
      <RightJustifiedSubmitButton onCancel={close} />
    </form>
  )
}
export default EditDataproduct

const sdsd = {
  errors: [
    {
      message:
        'Field "updateDataproduct" argument "input" of type "UpdateDataproduct!" is required but not provided.',
      locations: [{ line: 2, column: 3 }],
      extensions: { code: 'GRAPHQL_VALIDATION_FAILED' },
    },
  ],
  data: null,
}
