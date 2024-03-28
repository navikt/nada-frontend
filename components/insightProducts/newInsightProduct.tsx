import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import ErrorMessage from '../lib/error'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import DescriptionEditor from '../lib/DescriptionEditor'
import {
    Button,
    Heading,
    TextField,
    Select,
    Checkbox,
} from '@navikt/ds-react'
import amplitudeLog from '../../lib/amplitude'
import * as yup from 'yup'
import { ChangeEvent, useContext, useState } from 'react'
import TagsSelector from '../lib/tagsSelector'
import { UserState } from "../../lib/context";
import { CREATE_INSIGHT_PRODUCT } from '../../lib/queries/insightProducts/createInsightProduct'

const schema = yup.object().shape({
    name: yup.string().nullable().required('Skriv inn navnet på innsiktsproduktet'),
    description: yup.string(),
    teamkatalogenURL: yup.string().required('Du må velge team i teamkatalogen'),
    keywords: yup.array(),
    type: yup.string(),
    link: yup
        .string()
        .required('Du må legge til en lenke til innsiktsproduktet')
        .url('Lenken må være en gyldig URL'), // Add this line to validate the link as a URL    type: yup.string().required('Du må velge en type for innsiktsproduktet'),
    group: yup.string().required('Du må skrive inn en gruppe for innsiktsproduktet')
})

export interface NewInsightProductFields {
    name: string
    description: string
    teamkatalogenURL: string
    keywords: string[]
    link: string
    type: string
    group: string
}

export const NewInsightProductForm = () => {
    const router = useRouter()
    const [productAreaID, setProductAreaID] = useState<string>('')
    const [teamID, setTeamID] = useState<string>('')
    const userData = useContext(UserState)
    const [isPrivacyCheckboxChecked, setIsPrivacyCheckboxChecked] = useState(false)

    const handlePrivacyCheckboxChange = () => {
        setIsPrivacyCheckboxChecked(!isPrivacyCheckboxChecked)
    }

    const {
        register,
        handleSubmit,
        watch,
        formState,
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: undefined,
            description: '',
            teamkatalogenURL: '',
            keywords: [] as string[],
            link: '',
            type: '',
            group: '',
        },
    })

    const { errors } = formState
    const keywords = watch('keywords')

    const onDeleteKeyword = (keyword: string) => {
        keywords !== undefined ? 
        setValue('keywords', keywords.filter((k: string) => k !== keyword))
        :
        setValue('keywords', [])
    }

    const onAddKeyword = (keyword: string) => {
        keywords
            ? setValue('keywords', [...keywords, keyword])
            : setValue('keywords', [keyword])
    }

    const valueOrNull = (val: string) => (val == '' ? null : val)

    const onSubmit = async (data: any) => {
        const inputData = {
            variables: {
                input: {
                    name: data.name,
                    description: valueOrNull(data.description),
                    keywords: data.keywords,
                    teamkatalogenURL: data.teamkatalogenURL,
                    productAreaID: productAreaID,
                    teamID: teamID,
                    link: data.link,
                    type: data.type,
                    group: data.group,
                },
            },
            refetchQueries: ['searchContent'],
        }

        try {
            await createInsightProduct(inputData)
            amplitudeLog('skjema fullført', { skjemanavn: 'ny-innsiktsprodukt' })
        } catch (e) {
            amplitudeLog('skjemainnsending feilet', {
                skjemanavn: 'ny-innsiktsprodukt',
            })
            console.log(e)
        }

    }

    const [createInsightProduct, { loading, error: backendError }] = useMutation(
        CREATE_INSIGHT_PRODUCT,
        {
            onCompleted: (data) => {
                router.push("/")
            },
        }
    )

    const onCancel = () => {
        amplitudeLog(
            'Klikker på: Avbryt',
            {
                pageName: 'ny-innsiktsprodukt',
            },
            () => {
                router.back()
            }
        )
    }

    const onError = (errors: any) => {
        amplitudeLog('skjemavalidering feilet', {
            skjemanavn: 'ny-innsiktsprodukt',
            feilmeldinger: Object.keys(errors)
                .map((errorKey) => errorKey)
                .join(','),
        })
    }

    const gcpProjects = userData?.gcpProjects as any[] || []

    return (
        <div className="mt-8 md:w-[46rem]">
            <Heading level="1" size="large">
                Legg til innsiktsprodukt
            </Heading>
            <form
                className="pt-12 flex flex-col gap-10"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <TextField
                    className="w-full"
                    label="Navn på innsiktsprodukt"
                    {...register('name')}
                    error={errors.name?.message?.toString()}
                />
                <DescriptionEditor
                    label="Beskrivelse av hva innsiktsproduktet kan brukes til"
                    name="description"
                    control={control}
                />
                <TextField
                    className="w-full"
                    label="Lenke til innsiktsprodukt"
                    {...register('link')}
                    error={errors.link?.message?.toString()}
                />
                <Select
                    className="w-full"
                    label="Velg type innsiktsprodukt"
                    {...register('type')}
                    error={errors.type?.message?.toString()}
                >
                    <option value="">Velg type</option>
                    <option value="Amplitude">Amplitude</option>
                    <option value="Grafana">Grafana</option>
                    <option value="HotJar">HotJar</option>
                    <option value="TaskAnalytics">TaskAnalytics</option>
                    <option value="Metabase">Metabase</option>
                    <option value="Tableau">Tableau</option>
                    <option value="Annet">Annet</option>
                </Select>
                <Select
                    className="w-full"
                    label="Velg gruppe fra GCP"
                    {...register('group', {
                        onChange: () => setValue('teamkatalogenURL', ''),
                    })}
                    error={errors.group?.message?.toString()}
                >
                    <option value="">Velg gruppe</option>
                    {[
                        ...new Set(
                            gcpProjects.map(
                                ({ group }: { group: { name: string } }) => (
                                    <option
                                        value={
                                            userData?.groups.filter((g: any) => g.name === group.name)[0]
                                                .email
                                        }
                                        key={group.name}
                                    >
                                        {group.name}
                                    </option>
                                )
                            )
                        ),
                    ]}
                </Select>
                <TeamkatalogenSelector
                    gcpGroups={userData?.gcpProjects?.map((it: any) => it.group.email)}
                    register={register}
                    watch={watch}
                    errors={errors}
                    setProductAreaID={setProductAreaID}
                    setTeamID={setTeamID}
                />
                <TagsSelector
                    onAdd={onAddKeyword}
                    onDelete={onDeleteKeyword}
                    tags={keywords || []}
                />
                {backendError && <ErrorMessage error={backendError} />}
                <div className="flex items-center mt-4">
                    <Checkbox
                        size="small"
                        checked={isPrivacyCheckboxChecked}
                        onChange={handlePrivacyCheckboxChange}
                        className="pl-2"
                    >
                        Innholdsprodukter inneholder ikke personsensitive eller identifiserende opplysninger
                    </Checkbox>
                </div>
                <div className="flex flex-row gap-4 mb-16">
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Avbryt
                    </Button>
                    <Button type="submit" disabled={!isPrivacyCheckboxChecked}>
                        Lagre
                    </Button>
                </div>
            </form>
        </div>
    )
}