import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
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
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import { DataproductSourceForm } from './dataproductSourceForm'
import { NewDataproduct } from '../../lib/schema/graphql'
import { useEffect } from 'react'
import DescriptionEditor from '../lib/DescriptionEditor'
import { Fieldset, TextField } from '@navikt/ds-react'
import { CreateForm } from '../lib/CreateForm'
import amplitudeLog from '../../lib/amplitude'

export const NewDataproductForm = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(newDataproductValidation),
    })

  const { errors } = formState
  const keywords = watch('keywords')

  const onDelete = (keyword: string) => {
    setValue('keywords',keywords.filter((k: string) => k !== keyword))
  }

  const onAdd = (keyword: string) => {
    keywords ?
        setValue('keywords',[...keywords, keyword]) :
        setValue('keywords',[keyword])
  }

  const onSubmit = async (requestData: NewDataproduct) => {
    try {
      await createDataproduct({
        variables: { input: requestData },
      })
      amplitudeLog('skjema fullført', { skjemanavn: 'nytt-dataprodukt' })
    } catch (e) {
      amplitudeLog('skjemainnsending feilet', {
        skjemanavn: 'nytt-dataprodukt',
      })
      console.log(e)
    }
  }

  useEffect(() => {
    setValue('pii', true)
  }, [setValue])

  const group = watch('group')

  const [createDataproduct, { loading, error: backendError }] =
    useMutation(CREATE_DATAPRODUCT, {
      onCompleted: (data) =>
        router.push(`/dataproduct/${data.createDataproduct.id}/${data.createDataproduct.slug}/access`),
    })


  const onCancel = () => {
    amplitudeLog(
      'Klikker på: Avbryt',
      {
        pageName: 'nytt-dataprodukt',
      },
      () => {
        router.back()
      }
    )
  }

  const onError = (errors: any) => {
    amplitudeLog('skjemavalidering feilet', {
      skjemanavn: 'nytt-dataprodukt',
      feilmeldinger: Object.keys(errors)
        .map((errorKey) => errorKey)
        .join(','),
    })
  }

  return (
    <CreateForm onSubmit={handleSubmit(onSubmit, onError)}>
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
            type={'url'}
          id="repo"
          label="Link til kildekode"
          {...register('repo')}
          error={errors.repo?.message}
        />
        <TeamSelector register={register} errors={errors} />
        {group ? (
            <TeamkatalogenSelector
                group={group}
                register={register}
                errors={errors}
                watch={watch}
            />
        ) : null}
        <DataproductSourceForm
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />

        <KeywordsInput
            onAdd={onAdd}
            onDelete={onDelete}
            keywords={keywords || []}
            error={errors.keywords?.[0].message}
        />
        <PiiCheckboxInput register={register} watch={watch} />
        <RightJustifiedSubmitButton onCancel={onCancel} loading={loading} />
      </Fieldset>
    </CreateForm>
  )
}
