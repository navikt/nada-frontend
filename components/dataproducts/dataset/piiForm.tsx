import { ApolloError } from "@apollo/client"
import { AnnotateColumnListener, ColumnType, PIITagOptions, PIITagType } from "./useColumnTags"
import { Control, Controller, FieldValues, FormState, UseFormGetValues, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Tag, Checkbox, Alert, Radio, RadioGroup, Textarea } from "@navikt/ds-react"
import { Personopplysninger } from "./helptext"
import AnnotateDatasetTable from "./annotateDatasetTable"

interface PiiFormProps {
    loading: boolean
    apolloError: ApolloError | undefined
    columns: ColumnType[] | undefined
    tags: Map<string, PIITagType> | undefined
    control: Control<FieldValues, any>
    getValues: UseFormGetValues<FieldValues>
    register: UseFormRegister<FieldValues>
    formState: FormState<FieldValues>
    watch: UseFormWatch<FieldValues>
    annotateColumn: AnnotateColumnListener
}

export const PiiForm = ({
    loading,
    apolloError,
    columns,
    tags,
    control,
    getValues,
    register,
    formState,
    watch,
    annotateColumn,
}: PiiFormProps) => {

    var showAnnotateDatasetTable = watch("pii") === "sensitive"
    var showAnnonymisePii = !!tags && [...tags!!.values()].some(it=> it==='PII_DirekteIdentifiserende')

    return <div>
        <Controller
            name="pii"
            control={control}
            render={({ field }) => (
                <RadioGroup
                    {...field}
                    legend={
                        <p className="flex gap-2 items-center">
                            Inneholder datasettet personopplysninger?{' '}
                            <Personopplysninger />
                        </p>
                    }
                >
                    <Radio value={'sensitive'}>
                        Ja, inneholder personopplysninger
                    </Radio>
                    {showAnnotateDatasetTable && (
                        <AnnotateDatasetTable
                            loading={loading}
                            error={apolloError}
                            columns={columns}
                            tags={tags}
                            annotateColumn={annotateColumn}
                        />
                    )}
                    <Radio value={'anonymised'}>
                        Det er benyttet metoder for å anonymisere personopplysningene
                    </Radio>
                    <Textarea
                        placeholder="Beskriv kort hvordan opplysningene er anonymisert"
                        label="Metodebeskrivelse"
                        aria-hidden={getValues('pii') !== 'anonymised'}
                        className={getValues('pii') !== 'anonymised' ? 'hidden' : ''}
                        error={formState.errors?.anonymisation_description?.message?.toString()}
                        {...register('anonymisation_description')}
                    />
                    <Radio value={'none'}>
                        Nei, inneholder ikke personopplysninger
                    </Radio>
                </RadioGroup>
            )}
        />
        {showAnnonymisePii &&
            <Alert variant="info">
            Vi kan processe tablen/viewen for å annonymise personopplysningsinformationen for columnene:
            {[...tags!!.entries()].map((it, index)=> <div key={index}>
                {it[1] === 'PII_DirekteIdentifiserende'&& <Tag variant="success" >{it[0]}</Tag>}
            </div>)}
            <Checkbox {...register("createPseudoynimizedView")}>Jeg vil dele en annonymisert view hvor personopplysningene informasjon er psuedomisert</Checkbox>
            </Alert>
        }
    </div>
} 