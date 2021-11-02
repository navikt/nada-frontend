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
import { Box, Modal } from '@mui/material'

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
  const [date, setDate] = useState<Date | null>(new Date())
  const handleChange = (newValue: Date | null) => {
    setDate(newValue)
  }

  const [grantAccess] = useGrantAccessMutation()

  const onSubmit = () => {
    /*
    let variables: GrantAccessMutationVariables = {
      dataproductID,
      subject,
      subjectType: SubjectType.User,
    }
    //    if (date) variables.expires = date
*/

    try {
      grantAccess({
        variables: {
          dataproductID,
          subject,
          subjectType: SubjectType.User,
          expires: date,
        },
        refetchQueries: ['DataproductAccess'],
      })
    } catch (e) {
      console.log('this be error, ', e)
    }
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
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <RightJustifiedSubmitButton onCancel={() => setOpen(false)} />
        </form>
      </Box>
    </Modal>
  )
}

export default AddAccess
