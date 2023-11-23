import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import {
    Alert,
    Button,
    Checkbox,
    DatePicker,
    Heading,
    Link,
    Loader,
    Radio,
    RadioGroup,
    Select,
    Switch,
    TextField,
    useDatepicker,
} from '@navikt/ds-react'
import { useContext, useState } from 'react'
import { UserState } from '../../../lib/context'
import {
    useAccessiblePseudoDatasetsQuery,
} from '../../../lib/schema/graphql'
import { CREATE_JOINABLEVIEWS } from '../../../lib/queries/pseudoView/newJoinableViews'
import { TrashIcon } from '@navikt/aksel-icons'
import { GET_JOINABLEVIEWS } from '../../../lib/queries/pseudoView/joinableViews'


const tomorrow = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date
}

const startDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 21)
    return date
}

export interface NewJoinableViewFields {
}

export const NewJoinableView = () => {
    const router = useRouter()
    const userInfo = useContext(UserState)
    const [submitted, setSubmitted] = useState(false)
    const [srcDatasets, setSrcDatasets] = useState<string[]>(["", ""])
    const [fnrColumn, setFnrColumn] = useState<string[]>(["", ""])
    const [name, setName] = useState("")
    const [expires, setExpires] = useState<string | null>(startDate().toISOString())
    const [isTimeLimited, setIsTimeLimited] = useState(true)
    const [mapToFkNada, setMapToFkNada] = useState<boolean>(false)

    const search = useAccessiblePseudoDatasetsQuery({
        fetchPolicy: 'network-only',
    })

    const [createJoinableViews, { loading, error: backendError }] = useMutation(
        CREATE_JOINABLEVIEWS,
        {
            onCompleted: (data) =>
                router.push(
                    `/user/access?accessCurrentTab=joinable`
                ),
            refetchQueries: [GET_JOINABLEVIEWS],
            awaitRefetchQueries: true,
        }
    )

    const pseudoDatasets = search.data?.accessiblePseudoDatasets
    const handleSubmit = async () => {
        setSubmitted(true)
        try {
            await createJoinableViews({
                variables: {
                    input: {
                        name: name, expires: isTimeLimited ? expires : null, mapToFkNada: mapToFkNada, datasetIDs: srcDatasets, fnrColumns: fnrColumn,
                    }
                }
            })

        } catch (e) {
            console.log(e)
            setSubmitted(false)
        }
    }

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
        fromDate: tomorrow(),
        defaultSelected: startDate(),
        onDateChange: (d: Date | undefined) => { d ? setExpires(d.toISOString()) : setExpires(null) },
    });

    const containsFkNada = (datasetID: string) =>
        pseudoDatasets?.find(pds => pds.datasetID === datasetID)?.pseudoColumns?.some(n => n.toLowerCase() === 'fk_nada')

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
                        <hr className="border-border-on-inverted" />
                        <Switch checked={mapToFkNada} onChange={() => setMapToFkNada(!mapToFkNada)}>Ønsker du å koble sammen data fra DVH og/eller justere tidsserier slik at personer alltid har samme id?</Switch>
                        <hr className="border-divider mb-6" />
                        {
                            srcDatasets.map((it, index) => <div><div key={index}
                                className='flex flex-row items-center gap-2'>
                                <Select
                                    className="w-[40%]"
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
                                {mapToFkNada && (!containsFkNada(it) ? <Select
                                    className="w-[60%]"
                                    label="Kolonne med fødselsnummer"
                                    value={fnrColumn[index]}
                                    onChange={e => {
                                        fnrColumn[index] = e.target.value
                                        setFnrColumn([...fnrColumn])
                                    }}
                                    error={!it && "Du må velg et kolonne"}
                                >
                                    <option value="">Velg kolonne</option>
                                    {pseudoDatasets[index].pseudoColumns?.map((it, index) => <option value={it} key={index}>{it}</option>)}
                                </Select> : <div className="w-[60%] text-s text-gray-500">Tabellen inneholder en koblingsnøkkel fra Datavarehus og du skal derfor ikke oppgi kolonne som inneholder fødselsnummer</div>)}
                                {srcDatasets.length > 2 && <div className='h-20 flex flex-col justify-end'>
                                    <TrashIcon fontSize="3rem"
                                        onClick={() => setSrcDatasets([...srcDatasets.filter((_, i) => i !== index)])} />

                                </div>}
                            </div>

                                <br></br>
                            </div>)

                        }

                        {pseudoDatasets && pseudoDatasets.length > srcDatasets.length &&
                            <Link href='#' onClick={() => {
                                setSrcDatasets([...srcDatasets, ""])
                                setFnrColumn([...fnrColumn, ""])
                            }}>
                                Legg til et nytt dataset
                            </Link>}
                        <Alert variant="info">
                            <div className='text-[#C30000]'>
                                Alle tabellene må være i Europe North1-regionen for å kunne kobles med vår løsning.
                            </div>
                        </Alert>
                    </div>
                }
                <div>
                    <RadioGroup
                        legend="Når skal viewene slettes?"
                        onChange={setIsTimeLimited}
                        value={isTimeLimited}
                    >
                        <Radio value={true}>Dato</Radio>
                        <DatePicker {...datepickerProps}>
                            <DatePicker.Input
                                {...inputProps}
                                label=""
                                disabled={!isTimeLimited}
                            />
                        </DatePicker>
                        <Radio value={false}>Aldri</Radio>
                    </RadioGroup>
                </div>
                {backendError && <Alert variant="error">{backendError.message}</Alert>}
                {submitted && !backendError && <div>Vennligst vent...<Loader size="small" /></div>}
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
