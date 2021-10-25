import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import ErrorMessage from '../lib/error'
import DataproductForm from './dataproductForm'
import { useRouter } from 'next/router'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'
import { CREATE_DATAPRODUCT } from '../../lib/queries/dataproduct/createDataproduct'
import { useMutation } from '@apollo/client'
import TeamSelector from '../lib/teamSelector'
import { DataproductSourceForm } from './dataproductSourceForm'
import { NewDataproduct } from '../../lib/schema/graphql'

export const NewDataproductForm = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(newDataproductValidation),
  })
  const [createDataproduct, { data, loading, error: backendError }] =
    useMutation(CREATE_DATAPRODUCT, {
      onCompleted: (data) =>
        router.push(`/dataproduct/${data.createDataproduct.id}`),
    })
  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }

  const { errors } = formState

  const onSubmit = async (requestData: NewDataproduct) => {
    try {
      await createDataproduct({
        variables: { input: requestData },
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {backendError && <ErrorMessage error={backendError} />}
      <DataproductForm register={register} errors={errors} />
      <TeamSelector register={register} errors={errors} />
      <DataproductSourceForm
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
      <PiiCheckboxInput register={register} watch={watch} />
      <KeywordsInput
        keywords={keywords}
        setKeywords={setKeywords}
        {...register('keywords')}
        error={errors.keywords?.[0].message}
      />
      <RightJustifiedSubmitButton onCancel={router.back} loading={loading} />
    </form>
  )
}
