import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ApolloError, useMutation } from '@apollo/client'
import {
    Alert,
  Button,
  ErrorMessage,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  TextField,
} from '@navikt/ds-react'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import { Checkbox } from '@navikt/ds-react'
import { UserState } from '../../../lib/context'
import { Dataproduct, SearchType, useAccessibleDatasetsQuery, useSearchContentWithOptionsQuery } from '../../../lib/schema/graphql'
import { CREATE_JOINABLEVIEWS } from '../../../lib/queries/pseudoView/newJoinableViews'


const schema = yup.object().shape({
  datasetA: yup.string().nullable().required('Du må fylle inn dataset navn'),
  datasetB: yup.string().nullable().required('Du må fylle inn dataset navn'),
})

export interface NewJoinableViewFields {
}

export const NewJoinableView = () => {
  const router = useRouter()
  const userInfo = useContext(UserState)

  const {
    register,
    handleSubmit,
    watch,
    formState,
    setValue,
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { errors } = formState

  const search = useAccessibleDatasetsQuery({
    fetchPolicy: 'network-only',
  })

  const [createJoinableViews, { loading, error: backendError }] = useMutation(
    CREATE_JOINABLEVIEWS,
    {
      onCompleted: (data) =>
        router.push(
          `/user/joinableViews`
        ),
    }
  )

  const pseudoDatasets = 
  search.data?.accessibleDatasets
  .filter(it=> it.bqTableID.startsWith('_x_'))
  const onSubmit = async (data: any) => {
    await createJoinableViews({
        variables: {input: {datasetIDs: [data.datasetA, data.datasetB]}}
    })
  }
  const datasetA = watch('datasetA')
  const datasetB = watch('datasetB')

  const onError = ()=>{}

  return (
    <div className="mt-8 md:w-[46rem]">
      <Heading level="1" size="large">
        Bestiller sammenføybare psuedoynimisert view
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Select
          className="w-full"
          label="Velg først view"
          {...register('datasetA')}
          error={errors.datasetA?.message?.toString()}
        >
          <option value="">Velg dataset</option>
          {[
            ...new Set(
              pseudoDatasets?.map((it)=> <option value = {it.datasetID} key={it.datasetID}>{it.name}</option>)
            ),
          ]}
        </Select>
        <Select
          className="w-full"
          label="Velg andre view"
          {...register('datasetB')}
          error={errors.datasetB?.message?.toString()}
        >
          <option value="">Velg dataset</option>
          {[
            ...new Set(
              pseudoDatasets?.filter(it=> it.datasetID!= datasetA)
              .map((it)=> <option value = {it.datasetID} key={it.datasetID}>{it.name}</option>)
            ),
          ]}
        </Select>
        {backendError && <Alert variant="error">{backendError.message}</Alert>}
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" variant="secondary" onClick={()=> router.back()}>
            Avbryt
          </Button>
          <Button type="submit">Lagre</Button>
        </div>
      </form>
    </div>
  )
}

export default NewJoinableView;
