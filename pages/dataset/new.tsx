import PageLayout from '../../components/pageLayout'
import {
  Button,
  Fieldset,
  TextField,
  Select,
  ErrorSummary, ConfirmationPanel,
} from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import { AuthState } from '../../lib/context'
import { useRouter } from 'next/router'
/*
    NewDataset: {
      name: string;
      description?: string;
      dataproduct_id: string;
      pii: boolean;
      bigquery: components["schemas"]["BigQuery"];
    BigQuery: {
      project_id: string;
      dataset: string;
      table: string;
    };
 */

const schemaValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  dataproduct_id: yup.string().required("Datasett må kobles til et dataprodukt"),
  pii: yup.boolean().required("Inneholder datasettet personidentifiserende informasjon?"),
  project_id: yup.string().required("Du må oppgi prosjektid"),
  dataset: yup.string().required("Du må oppgi datasettnavn"),
  table: yup.string().required("Du må oppgi tabellnavn"),
})

const formOptions = {
  resolver: yupResolver(schemaValidation),
  defaultValues: {
    pii: true
  }
}

const postForm = async (url: string, data: any) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`)

  return await res.json()
}

const NewDataSet = () => {
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const router = useRouter()

  const [backendError, setBackendError] = useState()
  const [piiChecked, setPiiChecked] = useState()

  const user = useContext(AuthState).user
  const teams = user?.teams
  const dataproducts = ["test"]

  const onSubmit = async (data: any) => {
    const requestData = {
      ...data,
      bigQuery: {
        project_id: data.project_id,
        dataset: data.dataset,
        table: data.table,
      },
    }
    delete requestData.project_id
    delete requestData.dataset
    delete requestData.table

    try {
      const createdDataset = await postForm(`/api/datasets`, requestData)
      router.push(`/datasets/${createdDataset.id}`)
      setBackendError(undefined)
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }

  // FIXME: Blaffer feilmelding i påvente av user
  if (!user)
    return (
      <PageLayout>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </PageLayout>
    )

  return (
    <PageLayout>
      {backendError && (
        <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset legend="Datasett" errorPropagation={false}>
          <TextField
            id="name"
            label="Navn"
            {...register('name')}
            error={errors.name?.message}
          />
          <TextField
            id="description"
            label="Beskrivelse"
            {...register('description')}
            error={errors.description?.message}
          />
          <Select
              label="dataproduct_id"
              {...register('dataproduct_id')}
              error={errors.dataproduct_id?.message}
          >
            <option value="">Velg dataprodukt</option>
            {dataproducts?.map((t) => (
                <option value={t} key={'dataproduct_' + t}>
                  {t}
                </option>
            ))}
          </Select>
          <TextField
            id="slug"
            label="Slug"
            {...register('slug')}
            error={errors.slug?.message}
            description={'Slug-teksten blir brukt som URL'}
          />
          <TextField
            id="repo"
            label="Repo"
            {...register('repo')}
            error={errors.repo?.message}
          />
          <Select
            label="Team"
            {...register('team')}
            error={errors.team?.message}
          >
            <option value="">Velg team</option>
            {teams?.map((t) => (
              <option value={t} key={'dataproduct_team_' + t}>
                {t}
              </option>
            ))}
          </Select>
          <ConfirmationPanel
              {...register('pii', {value:true})}
              defaultChecked={true}
              label="Personidentifiserende informasjon"
              size="small"
          >
            Dette datasettet inneholder personidentifiserende informasjon
          </ConfirmationPanel>
        </Fieldset>
        <Button type={'submit'}>Lagre</Button>
      </form>
    </PageLayout>
  )
}

export default NewDataSet
