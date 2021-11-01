import { Fieldset, Modal } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  GrantAccessMutationVariables,
  SubjectType,
  useGrantAccessMutation,
} from '../../lib/schema/graphql'
import { addAccessValidation } from '../../lib/schema/yupValidations'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useState } from 'react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'

interface AddAccessProps {
  dataproductID: string
  open: boolean
  setOpen: (value: boolean) => void
  subject: string
}

const AddAccess = ({
  dataproductID,
  open,
  setOpen,
  subject,
}: AddAccessProps) => {
  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(addAccessValidation),
  })
  const { errors } = formState
  const [date, setDate] = useState<Date | null>(new Date())
  const handleChange = (newValue: Date | null) => {
    setDate(newValue)
  }

  const [grantAccess] = useGrantAccessMutation()
  const Zindex = styled.div`
    z-index: 2100;
  `

  const onSubmit = async () => {
    console.log('shit happens')
    let variables: GrantAccessMutationVariables = {
      dataproductID,
      subject,
      subjectType: SubjectType.User,
    }
    //    if (date) variables.expires = date

    try {
      await grantAccess({
        variables,
      })
    } catch (e) {
      console.log('this be error, ', e)
    }
    await setOpen(false)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Content style={{ paddingTop: '60px' }}>
        <form onSubmit={() => onSubmit()}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Zindex>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Zindex>
          </LocalizationProvider>
          <RightJustifiedSubmitButton onCancel={() => setOpen(false)} />
        </form>
      </Modal.Content>
    </Modal>
  )
}

export default AddAccess
