import { TextField } from '@navikt/ds-react'
import { useState } from 'react'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import { useSlackQuery } from '../../lib/schema/graphql'
import { isEmail } from '../../lib/validators'
import { EmailIcon } from '../lib/icons/emailIcon'
import { ErrorIcon } from '../lib/icons/errorIcon'
import { LoaderIcon } from '../lib/icons/loaderIcon'
import { SlackLogo } from '../lib/icons/slackLogo'

export interface IContactInputProps {
  register: UseFormRegister<any>
  formState: FormState<FieldValues>
}

export const ContactInput = ({ register, formState }: IContactInputProps) => {
  const { errors } = formState
  const [input, setInput] = useState('')
  const { data, loading } = useSlackQuery({
    variables: {
      name: input,
    },
  })

  return (
    <div className="flex flex-row items-end">
      <div className="w-5/6">
        <TextField
          label="Ønsket kontaktpunkt for dataproduktet"
          description="Kontaktpunktet kan være enten navnet på en public slack-kanal (uten #) eller en e-post."
          {...register('teamContact')}
          error={errors.teamContact?.message}
          className="w-full"
          onBlur={(e) => setInput(e.target.value)}
        />
      </div>
      {isEmail(input) && <EmailIcon />}
      {!!input && !isEmail(input) && loading && <LoaderIcon />}
      {!loading && data && data.IsValidSlackChannel && <SlackLogo />}
      {!!input &&
        !loading &&
        !isEmail(input) &&
        data &&
        !data.IsValidSlackChannel && <ErrorIcon />}
    </div>
  )
}
