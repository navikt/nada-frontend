import { ApolloError } from "@apollo/client"
import { AnnotateColumnListener, ColumnType, PIITagOptions, PIITagType, PseudoColumnListener } from "./useColumnTags"
import { Control, Controller, FieldValues, FormState, UseFormGetValues, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Tag, Checkbox, Alert, Radio, RadioGroup, Textarea, Switch } from "@navikt/ds-react"
import { Personopplysninger, PseudonymiseringsText } from "./helptext"
import AnnotateDatasetTable from "./annotateDatasetTable"
import { useState } from "react"

interface PiiFormProps {
    loading: boolean
    apolloError: ApolloError | undefined
    columns: ColumnType[] | undefined
    tags: Map<string, PIITagType> | undefined
    pseudoColumns: Map<string, boolean>
    control: Control<FieldValues, any>
    getValues: UseFormGetValues<FieldValues>
    register: UseFormRegister<FieldValues>
    formState: FormState<FieldValues>
    watch: UseFormWatch<FieldValues>
    annotateColumn: AnnotateColumnListener
    pseudoynimiseColumn: PseudoColumnListener
}

export const PiiForm = ({
    loading,
    apolloError,
    columns,
    tags,
    pseudoColumns,
    control,
    getValues,
    register,
    formState,
    watch,
    annotateColumn,
    pseudoynimiseColumn,
}: PiiFormProps) => {

    var showAnnotateDatasetTable = watch("pii") === "sensitive"
    var [createPseudoynimizedView, setcreatePseudoynimizedView] = useState(false)

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
                    {/* Pseudonymization */}
                    {false && showAnnotateDatasetTable &&
                        <div className="flex items-center gap-x-1">
                            <Switch onChange={e=>{
                                setcreatePseudoynimizedView(e.target.checked)
                            }}>Jeg ønsker å pseudonymisere tabellen </Switch>
                            <PseudonymiseringsText />
                        </div>
                    }
                    {createPseudoynimizedView && <Alert variant="info">Velg kolonner du ønsker å pseudonymisere</Alert>}
                    {showAnnotateDatasetTable && (
                        <AnnotateDatasetTable
                            loading={loading}
                            error={apolloError}
                            columns={columns}
                            tags={tags}
                            pseudoColumns={pseudoColumns}
                            selectPseudoColumn={createPseudoynimizedView ? pseudoynimiseColumn:undefined}
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
    </div>
} 