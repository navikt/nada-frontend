import {
  ConfirmationPanel,
  Fieldset,
  Select,
  TextField,
} from '@navikt/ds-react'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import ErrorMessage from '../lib/error'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import styled from 'styled-components'
import { useContext, useEffect } from 'react'
import { AuthState } from '../../lib/context'
import PiiCheckboxInput from './piiCheckboxInput'

interface DataproductFormProps {
  register: any
  errors: any
  watch: any
}

const DataproductForm = ({ register, errors, watch }: DataproductFormProps) => {
  return (
    <div>
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
        />
        <TextField
          id="repo"
          label="Repo"
          {...register('repo')}
          error={errors.repo?.message}
        />
      </Fieldset>
    </div>
  )
}
export default DataproductForm
