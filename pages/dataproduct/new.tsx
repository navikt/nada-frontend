import PageLayout from '../../components/pageLayout'
import {Button, Fieldset, TextField} from "@navikt/ds-react";
import {FormControl} from "@mui/material";


const NewDataProduct = () => {


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.name.value)
    }

    return (
        <PageLayout>
            <form onSubmit={handleSubmit}>
                <FormControl required>
                    <Fieldset legend="Dataprodukt" errorPropagation={false}>
                        <TextField id="name" label="Navn" />
                        <TextField id="description" label="Beskrivelse"/>
                        <TextField id="slug" label="Slug"/>
                        <TextField id="repo" label="Repo"/>
                        <TextField id="owner" label="Eier"/>
                        <TextField id="keywords" label="Nøkkelord"/>
                    </Fieldset>
                    <Button type={"submit"}>Lagre</Button>
                </FormControl>
            </form>
        </PageLayout>
    )
}

export default NewDataProduct
