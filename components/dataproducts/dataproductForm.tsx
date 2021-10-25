import { Fieldset, TextField } from '@navikt/ds-react'

interface DataproductFormProps {
  register: any
  errors: any
}

const DataproductForm = ({ register, errors }: DataproductFormProps) => {
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
