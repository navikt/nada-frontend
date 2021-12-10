import {QueryResult} from "@apollo/client";
import {DataproductAccessQuery, Exact} from "../../../lib/schema/graphql";
import ErrorMessage from "../../lib/error";
import LoaderSpinner from "../../lib/spinner";
import * as React from "react";
import {useState} from "react";
import {Button, Modal, TextField} from "@navikt/ds-react";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import RightJustifiedSubmitButton from "../../widgets/formSubmit";
import * as yup from "yup";

export const addAccessValidation = yup.object().shape({
    subject: yup
        .string()
        .email('Gyldig epost for gruppe eller bruker').required("Legg inn gyldig epost"),
    subjectType: yup.string().required(),
    expires: yup.date(),
})

interface OwnerProps {
    accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const Owner = ({accessQuery}: OwnerProps) => {
    const {error, loading, data: {dataproduct} = {}} = accessQuery
    const [open, setOpen] = useState(false)


    const {formState, handleSubmit, control, watch, register} =
        useForm({
            resolver: yupResolver(addAccessValidation),
            defaultValues: {
                subjectType: "",
                subject: ""
            }
        })
    const errors = formState.errors
    console.log("###",errors)

    const subjectType = watch('subjectType')

    if (error) return <ErrorMessage error={error}/>
    if (loading || !dataproduct) return <LoaderSpinner/>

    const onSubmit = (requestData: any) => {
        console.log('pushed')
        console.log(requestData)
    }


    return (
        <>
            <Button key="legg til" variant="primary" size="small" onClick={() => setOpen(true)}>
                legg til
            </Button>
            <br/>
            {
                (dataproduct.access.length === 0 && dataproduct.requesters.length === 0) && <>Ingen har tilgang til
                    produktet</>
            }

            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Content>
                    <div>
                        <h1>
                            Legg til tilgang
                        </h1>
                        <h3>Hvem skal ha tilgang?</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Brukertype</FormLabel>
                                <Controller
                                    rules={{ required: true }}
                                    control={control}
                                    name="subjectType"
                                    render={({ field }) => (
                                        <RadioGroup {...field}>
                                            <FormControlLabel
                                                value="all-users"
                                                control={<Radio />}
                                                label="alle i nav"
                                            />
                                            <FormControlLabel
                                                value="gruppe"
                                                control={<Radio />}
                                                label="gruppe"
                                            />
                                            <FormControlLabel
                                                value="bruker"
                                                control={<Radio />}
                                                label="bruker"
                                            />
                                            <FormControlLabel
                                                value="serviceAccount"
                                                control={<Radio />}
                                                label="serviceAccount"
                                            />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                            {!subjectType ? null: subjectType === 'all-users' ? <>alle brukere valgt</> :
                                <TextField
                                    style={{ width: '450px', display: 'block' }}
                                    id="subject"
                                    label={`navn på ${subjectType}`}
                                    {...register('subject')}
                                    error={errors.subject?.message}
                                />
                            }
                            <RightJustifiedSubmitButton/>
                        </form>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}


export default Owner

