import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ApolloError, useMutation } from '@apollo/client'
import {
    Alert,
  Button,
  ErrorMessage,
  Heading,
  Loader,
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
import LoaderSpinner from '../../../components/lib/spinner'


const schema = yup.object().shape({
  datasetA: yup.string().nullable().required('Du må fylle inn dataset navn'),
  datasetB: yup.string().nullable().required('Du må fylle inn dataset navn'),
})

export interface NewJoinableViewFields {
}

export const NewJoinableView = () => {
  const router = useRouter()
  const userInfo = useContext(UserState)
  const [submitted, setSubmitted] = useState(false)

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
    setSubmitted(true)
    try{
      await createJoinableViews({
        variables: {input: {datasetIDs: [data.datasetA, data.datasetB]}}
    })
      
    }catch(e){
      console.log(e)
    }
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
          label="Velg det første viewet"
          {...register('datasetA')}
          error={errors.datasetA?.message?.toString()}
        >
          <option value="">Velg datasett</option>
          {[
            ...new Set(
              pseudoDatasets?.map((it)=> <option value = {it.datasetID} key={it.datasetID}>{it.name}</option>)
            ),
          ]}
        </Select>
        <Select
          className="w-full"
          label="Velg det andre viewet"
          {...register('datasetB')}
          error={errors.datasetB?.message?.toString()}
        >
          <option value="">Velg datasett</option>
          {[
            ...new Set(
              pseudoDatasets?.filter(it=> it.datasetID!= datasetA)
              .map((it)=> <option value = {it.datasetID} key={it.datasetID}>{it.name}</option>)
            ),
          ]}
        </Select>
        <Alert variant="info">
          <div className='text-[#C30000]'>
            Alle tabellene må være i Europe North1-regionen for å kunne kobles med vår løsning.
          </div>
        </Alert>
        {backendError && <Alert variant="error">{backendError.message}</Alert>}
        {submitted && !backendError && <div>Vennligst vent...<Loader size="small" /></div>}
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" disabled={submitted} variant="secondary" onClick={()=> router.back()}>
            Avbryt
          </Button>
          <Button type="submit" disabled={submitted}>Lagre</Button>
        </div>
      </form>
    </div>
  )
}

export default NewJoinableView;
