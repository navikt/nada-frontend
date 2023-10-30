import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ApolloError, useMutation } from '@apollo/client'
import {
  Alert,
  Button,
  ErrorMessage,
  Heading,
  Link,
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
import { Dataproduct, SearchType, useAccessibleReferenceDatasourcesQuery, useSearchContentWithOptionsQuery } from '../../../lib/schema/graphql'
import { CREATE_JOINABLEVIEWS } from '../../../lib/queries/pseudoView/newJoinableViews'
import LoaderSpinner from '../../../components/lib/spinner'
import { TrashIcon } from '@navikt/aksel-icons'


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
  const [srcDatasets, setSrcDatasets] = useState<string[]>(["", ""])

  const {
    register,
    watch,
    formState,
    setValue,
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { errors } = formState

  const search = useAccessibleReferenceDatasourcesQuery({
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

  const pseudoDatasets = search.data?.accessibleReferenceDatasources
  const name = watch("name")
  const handleSubmit = async () => {

    setSubmitted(true)
    try {
      await createJoinableViews({
        variables: { input: { name: name, datasetIDs: srcDatasets } }
      })

    } catch (e) {
      console.log(e)
    }
  }

  const onError = () => { }

  return (
    <div className="mt-8 md:w-[46rem]">
      <Heading level="1" size="large">
        Tilrettelegg pseudonymiserte views for kobling
      </Heading>
      <form
        className="pt-12 flex flex-col gap-10"
      >
        <TextField
          className="w-full"
          label="Navn på BigQuery dataset"
          {...register('name')}
          error={errors.name?.message?.toString()}
        />
                <hr className="border-border-on-inverted" />
        {
          srcDatasets.map((it, index) => <div className='flex flex-row items-center gap-2'>
            <Select
              className="w-full"
              label="Velg et view"
              value={it}
              onChange={e => {
                srcDatasets[index] = e.target.value
                setSrcDatasets([...srcDatasets])
              }}
            >
              <option value="">Velg datasett</option>
              {[
                ...new Set(
                  pseudoDatasets?.map((it) => <option value={it.datasetID} key={it.datasetID}>{it.name}</option>)
                ),
              ]}
            </Select>

            {srcDatasets.length> 2 && <div className='h-20 flex flex-col justify-end'>
            <TrashIcon fontSize="3rem" onClick={()=>setSrcDatasets([...srcDatasets.filter((_, i)=> i!== index)])}/>

            </div>}
          </div>)
        }
        <Link href='#' onClick={() => setSrcDatasets([...srcDatasets, ""])}>
          Legg til et nytt dataset
        </Link>
        <Alert variant="info">
          <div className='text-[#C30000]'>
            Alle tabellene må være i Europe North1-regionen for å kunne kobles med vår løsning.
          </div>
        </Alert>
        {backendError && <Alert variant="error">{backendError.message}</Alert>}
        {submitted && !backendError && <div>Vennligst vent...<Loader size="small" /></div>}
        <div className="flex flex-row gap-4 mb-16">
          <Button type="button" disabled={submitted} variant="secondary" onClick={() => router.back()}>
            Avbryt
          </Button>
          <Button type="button" disabled={submitted} onClick={()=> handleSubmit()}>Lagre</Button>
        </div>
      </form>
    </div>
  )
}

export default NewJoinableView;
