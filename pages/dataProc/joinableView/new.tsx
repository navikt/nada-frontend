import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, FieldValues, useForm} from 'react-hook-form'
import {useRouter} from 'next/router'
import {ApolloError, useMutation} from '@apollo/client'
import {
    Alert,
    Button,
    ErrorMessage,
    Heading,
    Link,
    Loader,
    Radio,
    RadioGroup,
    Select,
    Textarea,
    TextField,
} from '@navikt/ds-react'
import * as yup from 'yup'
import {useContext, useState} from 'react'
import {Checkbox} from '@navikt/ds-react'
import {UserState} from '../../../lib/context'
import {
    Dataproduct,
    SearchType,
    useAccessiblePseudoDatasetsQuery,
    useSearchContentWithOptionsQuery
} from '../../../lib/schema/graphql'
import {CREATE_JOINABLEVIEWS} from '../../../lib/queries/pseudoView/newJoinableViews'
import LoaderSpinner from '../../../components/lib/spinner'
import {TrashIcon} from '@navikt/aksel-icons'


const schema = yup.object().shape({
    datasetA: yup.string().nullable().required('Du må fylle inn dataset navn'),
    datasetB: yup.string().nullable().required('Du må fylle inn dataset navn'),
})

export interface NewJoinableViewFields {
}

export const NewJoinableView = () => {
    const router = useRouter()
    const userInfo = useContext(UserState)
    const [submitted, setSubmitted] = useState(false)
    const [srcDatasets, setSrcDatasets] = useState<string[]>(["", ""])
    const [name, setName] = useState("")

    const search = useAccessiblePseudoDatasetsQuery({
        fetchPolicy: 'network-only',
    })

    const [createJoinableViews, {loading, error: backendError}] = useMutation(
        CREATE_JOINABLEVIEWS,
        {
            onCompleted: (data) =>
                router.push(
                    `/user/joinableViews`
                ),
        }
    )

    const pseudoDatasets = search.data?.accessiblePseudoDatasets
    const handleSubmit = async () => {
        setSubmitted(true)
        try {
            await createJoinableViews({
                variables: {input: {name: name, datasetIDs: srcDatasets}}
            })

        } catch (e) {
            console.log(e)
            setSubmitted(false)
        }
    }

    const error = !name || srcDatasets.some(it => !it)
    return (
        <div className="mt-8 md:w-[46rem]">
            <Heading level="1" size="large">
                Tilrettelegg pseudonymiserte views for kobling
            </Heading>
            {pseudoDatasets && pseudoDatasets.length < 2 &&
                <Alert variant="info" className="mt-4">
                    Her kan du bestille pseudonymiserte views tilrettelagt for kobling. Løsningen forutsetter at du har
                    tilgang til minst to pseudonymiserte datasett registrert på Markedsplassen.
                </Alert>}
            <form
                className="pt-12 flex flex-col gap-10"
            >
                {pseudoDatasets && pseudoDatasets.length >= 2 &&
                    <div>
                        <TextField
                            className="w-full"
                            label="Navn på BigQuery dataset"
                            onChange={e => setName(e.target.value)}
                            error={!name && "Du må skrive inn et navn"}
                        />
                        <hr className="border-border-on-inverted"/>
                        {
                            srcDatasets.map((it, index) => <div key={index}
                                                                className='flex flex-row items-center gap-2'>
                                <Select
                                    className="w-full"
                                    label="Velg et view"
                                    value={it}
                                    onChange={e => {
                                        srcDatasets[index] = e.target.value
                                        setSrcDatasets([...srcDatasets])
                                    }}
                                    error={!it && "Du må velg et datasett"}
                                >
                                    <option value="">Velg datasett</option>
                                    {pseudoDatasets && [
                                        ...new Set(
                                            pseudoDatasets?.filter(it => !srcDatasets.some((sdsid, sdsindex) => sdsid == it.datasetID && index != sdsindex))
                                                .map((it: any) => <option value={it.datasetID}
                                                                          key={it.datasetID}>{it.name}</option>)
                                        ),
                                    ]}
                                </Select>

                                {srcDatasets.length > 2 && <div className='h-20 flex flex-col justify-end'>
                                    <TrashIcon fontSize="3rem"
                                               onClick={() => setSrcDatasets([...srcDatasets.filter((_, i) => i !== index)])}/>

                                </div>}
                            </div>)
                        }

                        {pseudoDatasets && pseudoDatasets.length > srcDatasets.length &&
                            <Link href='#' onClick={() => setSrcDatasets([...srcDatasets, ""])}>
                                Legg til et nytt dataset
                            </Link>}
                        <Alert variant="info">
                            <div className='text-[#C30000]'>
                                Alle tabellene må være i Europe North1-regionen for å kunne kobles med vår løsning.
                            </div>
                        </Alert>
                    </div>
                }
                {backendError && <Alert variant="error">{backendError.message}</Alert>}
                {submitted && !backendError && <div>Vennligst vent...<Loader size="small"/></div>}
                <div className="flex flex-row gap-4 mb-16">
                    <Button type="button" disabled={submitted} variant="secondary" onClick={() => router.back()}>
                        Avbryt
                    </Button>
                    <Button type="button" disabled={error || submitted} onClick={() => handleSubmit()}>Lagre</Button>
                </div>
            </form>
        </div>
    )
}

export default NewJoinableView;
