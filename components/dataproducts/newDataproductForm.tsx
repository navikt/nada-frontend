import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'
import { CREATE_DATAPRODUCT } from '../../lib/queries/dataproduct/createDataproduct'
import { useMutation } from '@apollo/client'
import TeamSelector from '../lib/teamSelector'
import { DataproductSourceForm } from './dataproductSourceForm'
import { NewDataproduct } from '../../lib/schema/graphql'
import { useEffect } from 'react'
import DescriptionEditor from '../lib/DescriptionEditor'
import { Fieldset, TextField } from '@navikt/ds-react'
import { CreateForm } from '../lib/CreateForm'

export const NewDataproductForm = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(newDataproductValidation),
    })
  useEffect(() => {
    setValue('pii', true)
  }, [])

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
    <CreateForm onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Nytt dataprodukt" errorPropagation={false}>
        {backendError && <ErrorMessage error={backendError} />}
        <TextField
          id="name"
          label="Navn"
          {...register('name')}
          error={errors.name?.message}
        />
        <DescriptionEditor
          label="Beskrivelse"
          name="description"
          control={control}
        />
        <TextField
          id="repo"
          label="Repo"
          {...register('repo')}
          error={errors.repo?.message}
        />
        <TeamSelector register={register} errors={errors} />
        <DataproductSourceForm
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
        <KeywordsInput
          keywords={keywords}
          setKeywords={setKeywords}
          {...register('keywords')}
          error={errors.keywords?.[0].message}
        />
        <PiiCheckboxInput register={register} watch={watch} />
        <RightJustifiedSubmitButton onCancel={router.back} loading={loading} />
      </Fieldset>
    </CreateForm>
  )
}
