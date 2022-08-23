import {
  SubjectType,
  useGrantAccessMutation,
} from '../../../lib/schema/graphql'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import * as React from 'react'
import { useState } from 'react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import TextField from '@mui/material/TextField'
import { Box, Modal } from '@mui/material'
import { endOfDay } from 'date-fns'
import amplitudeLog from '../../../lib/amplitude'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import { Alert } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'

interface AddAccessProps {
  dataproductID: string
  dataproductName: string
  open: boolean
  setOpen: (value: boolean) => void
  subject: string
}

const AddAccess = ({
  dataproductID,
  dataproductName,
  open,
  setOpen,
  subject,
}: AddAccessProps) => {
  const [date, setDate] = useState<Date | null>(endOfDay(new Date()))
  const [formError, setFormError] = useState('')
  const [grantAccess] = useGrantAccessMutation()
  const { handleSubmit } = useForm()

  const onSubmit = async () => {
    amplitudeLog('klikk', {
      sidetittel: 'tilgang',
      version: dataproductID,
      title: dataproductName,
    })

    try {
      await grantAccess({
        variables: {
          input: {
            dataproductID,
            subject,
            subjectType: SubjectType.User,
            expires: date,
          },
        },
        refetchQueries: ['DataproductAccess', 'userInfoDetails'],
      })
      setOpen(false)
    } catch (e: any) {
      setFormError(e.message)
    }
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Til"
              inputFormat="dd.MM.yyyy"
              value={date}
              onChange={(newVal) => setDate(newVal)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {formError && <Alert variant={'error'}>{formError}</Alert>}
          <RightJustifiedSubmitButton onCancel={() => setOpen(false)} />
        </form>
      </Box>
    </Modal>
  )
}

export default AddAccess
