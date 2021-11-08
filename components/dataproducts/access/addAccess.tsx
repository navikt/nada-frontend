import {
  GrantAccessMutationVariables,
  SubjectType,
  useGrantAccessMutation,
} from '../../../lib/schema/graphql'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useState } from 'react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import TextField from '@mui/material/TextField'
import { Box, Modal } from '@mui/material'
import { endOfDay } from 'date-fns'
import AccessSubmit from './accessSubmit'

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
  const [date, setDate] = useState<Date | null>(endOfDay(new Date()))
  const handleChange = (newValue: Date | null) => {
    setDate(newValue)
  }

  const [grantAccess] = useGrantAccessMutation()

  const onSubmit = (evig: boolean = false) => {
    let variables: GrantAccessMutationVariables = {
      dataproductID,
      subject,
      subjectType: SubjectType.User,
    }
    if (!evig && date) {
      variables.expires = endOfDay(date)
    }
    grantAccess({
      variables,
      refetchQueries: ['DataproductAccess'],
    })
      .then()
      .catch(console.log)
    setOpen(false)
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <form onSubmit={() => onSubmit()}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Gi meg tilgang til"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <AccessSubmit
            onCancel={() => setOpen(false)}
            onEvig={() => onSubmit(true)}
          />
        </form>
      </Box>
    </Modal>
  )
}

export default AddAccess