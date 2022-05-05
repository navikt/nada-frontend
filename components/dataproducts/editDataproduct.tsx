import {ErrorSummary, Fieldset, TextField} from '@navikt/ds-react'
import {useForm} from 'react-hook-form'
import {updateDataproductValidation} from '../../lib/schema/yupValidations'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {useState} from 'react'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import {Dataproduct, DataproductQuery, useUpdateDataproductMutation,} from '../../lib/schema/graphql'
import DescriptionEditor from '../lib/DescriptionEditor'
import {useRouter} from 'next/router'
import styled from 'styled-components'
import TopBar from '../lib/topBar'

interface EditDatacollectionFormProps {
  product: DataproductQuery['dataproduct']
}

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 40px;
`

const DataproductBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const DataproductBody = styled.div`
  padding: 1em 1em 2em 1em;
`
const EditDataproduct = ({ product }: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const [updateDataproduct] = useUpdateDataproductMutation()
  const router = useRouter()
  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(updateDataproductValidation),
      defaultValues: {
        name: product.name,
        description: product.description || '',
        repo: product.repo,
        keywords: product.keywords,
        teamkatalogenURL: product.owner.teamkatalogenURL,
        pii: product.pii,
      },
    })
  const keywords = watch('keywords')

  const onDelete = (keyword: string) => {
    setValue('keywords',keywords.filter((k) => k !== keyword))
  }
  const onAdd = (keyword: string) => {
    setValue('keywords',[...keywords, keyword])
  }

  const { errors } = formState
  const onSubmit = (requestData: any) => {
    updateDataproduct({
      variables: { id: product.id, input: requestData },
      awaitRefetchQueries: true,
      refetchQueries: ['Dataproduct', 'searchContent'],
    }).then(() => {
      setBackendError(undefined)
      router.push(`/dataproduct/${product.id}`)
    })
  }
  {
    backendError && (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    )
  }
  return (
    <Container>
      <DataproductBox>
        <TopBar type={product.__typename} name={'Rediger dataprodukt'} />
        <DataproductBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend={''}>
              <TextField
                style={{ width: '350px', display: 'block' }}
                id="name"
                label="Navn"
                {...register('name')}
                error={errors.name?.message}
              />
              <DescriptionEditor
                label="Beskrivelse"
                name="description"
                control={control}
              />
              <TextField
                type={'url'}
                style={{ width: '450px', display: 'block' }}
                id="repo"
                label="Link til kildekode"
                {...register('repo')}
                error={errors.repo?.message}
              />
              <TeamkatalogenSelector
                group={product.owner.group}
                register={register}
                errors={errors}
                watch={watch}
              />
              <KeywordsInput
                onAdd={onAdd}
                onDelete={onDelete}
                keywords={keywords}
                error={errors.keywords?.[0].message}
              />
              <PiiCheckboxInput register={register} watch={watch} />
              <RightJustifiedSubmitButton
                onCancel={() => router.push(`/dataproduct/${product.id}`)}
              />
            </Fieldset>
          </form>
        </DataproductBody>
      </DataproductBox>
    </Container>
  )
}
export default EditDataproduct
