import PageLayout from '../../components/pageLayout'
import {
  Button,
  Fieldset,
  TextField,
  Select,
  ErrorSummary,
} from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import { AuthState } from '../../lib/context'
import { useRouter } from 'next/router'

const schemaValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  team: yup.string().required('trenger teamnavn'),
  teamkatalog: yup.string(),
  keywords: yup.array().of(yup.string()),
})

const formOptions = { resolver: yupResolver(schemaValidation) }

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

const NewDataProduct = () => {
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  const router = useRouter()

  const [backendError, setBackendError] = useState()
  const user = useContext(AuthState).user
  const teams = user?.teams

  const onSubmit = async (data: any) => {
    const requestData = {
      ...data,
      owner: {
        team: data.team,
        teamkatalog: data.teamkatalog,
      },
    }
    delete requestData.team
    delete requestData.teamkatalog

    try {
      const createdProduct = await postForm(`/api/dataproducts`, requestData)
      router.push(`/dataproduct/${createdProduct.id}`)
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
        <Fieldset legend="Dataprodukt" errorPropagation={false}>
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
        </Fieldset>
        <Button type={'submit'}>Lagre</Button>
      </form>
    </PageLayout>
  )
}

export default NewDataProduct
