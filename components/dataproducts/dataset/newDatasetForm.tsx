import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { TextField } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { CREATE_DATASET } from "../../../lib/queries/dataset/createDataset";
import { DataproductQuery, NewDataset } from "../../../lib/schema/graphql";
import DescriptionEditor from "../../lib/DescriptionEditor";
import KeywordsInput from "../../lib/KeywordsInput";
import RightJustifiedSubmitButton from "../../widgets/formSubmit";
import DataproductSourceForm from "../dataproductSourceForm";
import PiiCheckboxInput from "../piiCheckboxInput";

interface NewDatasetFormProps {
    dataproduct: DataproductQuery
}

const schema = yup.object().shape({
    name: yup.string().required("Du må fylle inn navn"),
    description: yup.string().required("")
});

const NewDatasetForm = ({ dataproduct }: NewDatasetFormProps) => {
    const router = useRouter()
    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onDelete = (keyword: string) => {
        setValue('keywords', keywords.filter((k: string) => k !== keyword))
    }

    const keywords = watch('keywords')

    const onAdd = (keyword: string) => {
        keywords ?
            setValue('keywords', [...keywords, keyword]) :
            setValue('keywords', [keyword])
    }

    const [createDataset, { loading, error: backendError }] =
        useMutation(CREATE_DATASET, {
            onCompleted: (data) =>
                router.push(`/dataproduct/${dataproduct.dataproduct.id}/${dataproduct.dataproduct.id}/${data.createDataset.id}`),
        })

    const onSubmit = async (requestData: NewDataset) => {
        try {
            await createDataset({
                variables: { input: requestData },
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="pt-8 pr-8">
            <div>Navn på datasettet</div>
            <TextField
                {...register("name")}
                className="hidden-label"
                label="dataset-name"
                placeholder="Skriv inn navn på datasett"
                error={errors?.name?.message}
                size="medium"
            />
            <DescriptionEditor
                {...register("description")}
                name="description"
                label="Beskrivelse"
                control={control}
            />
            <TextField
                {...register('repo')}
                type={'url'}
                id="repo"
                label="Link til kildekode"
                error={errors.repo?.message}
            />
            <DataproductSourceForm
                register={register}
                watch={watch}
                errors={errors}
                setValue={setValue}
            />
            <KeywordsInput
                onAdd={onAdd}
                onDelete={onDelete}
                keywords={keywords || []}
                error={errors.keywords?.[0].message}
            />
            <PiiCheckboxInput register={register} watch={watch} />
            <RightJustifiedSubmitButton onCancel={() => { console.log("cancel") }} loading={loading} />
        </div>
    )
}

export default NewDatasetForm;
