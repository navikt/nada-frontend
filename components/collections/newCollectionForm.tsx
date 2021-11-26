import { Fieldset, Select, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { newCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { UserState } from '../../lib/context'
import KeywordsInput from '../lib/KeywordsInput'
import { CreateForm } from '../lib/CreateForm'
import {
  SearchContentQuery,
  UserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import amplitudeLog from '../../lib/amplitude'

interface NewDatacollectionFormProps {
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

export const NewCollectionForm = ({
  onSubmit,
  onCancel,
}: NewDatacollectionFormProps) => {
  const [keywords, setKeywords] = useState<string[]>([])
  const { register, handleSubmit, formState, setValue, control } = useForm({
    resolver: yupResolver(newCollectionValidation),
  })
  // propagates change in keywords state to useForm state
  useEffect(() => setValue('keywords', keywords), [keywords, setValue])
  const { errors } = formState

  const groups = useContext<UserInfoDetailsQuery['userInfo'] | undefined>(
    UserState
  )?.groups

  const onError = (errors: any) => {
    amplitudeLog('skjemavalidering feilet', {
      skjemanavn: 'ny-collection',
      feilmeldinger: Object.keys(errors)
        .map((errorKey) => errorKey)
        .join(','),
    })
  }

  return (
    <CreateForm onSubmit={handleSubmit(onSubmit, onError)}>
      <Fieldset legend="Opprett samling" errorPropagation={false}>
        <TextField
          id="name"
          label="Navn"
          {...register('name')}
          error={errors.name?.message}
        />
        <Select
          label="Team"
          {...register('group')}
          error={errors.group?.message}
        >
          <option value="">Velg team</option>
          {groups?.map((group) => (
            <option value={group.email} key={group.name}>
              {group.name}
            </option>
          ))}
        </Select>
        <KeywordsInput
          keywords={keywords}
          setKeywords={setKeywords}
          {...register('keywords')}
          error={errors.keywords?.[0].message}
        />
      </Fieldset>
      <RightJustifiedSubmitButton onCancel={onCancel} />
    </CreateForm>
  )
}
