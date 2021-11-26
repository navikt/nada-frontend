import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useState } from 'react'
import KeywordsInput from '../lib/KeywordsInput'
import {
  CollectionQuery,
  useUpdateCollectionMutation,
} from '../../lib/schema/graphql'
import styled from 'styled-components'
import TopBar from '../lib/topBar'
import { Name } from '../lib/detailTypography'
import { useRouter } from 'next/router'

interface EditDatacollectionFormProps {
  collection: CollectionQuery['collection']
}

const Container = styled.div`
  margin-top: 40px;
`

const Collection = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const CollectionBody = styled.div`
  padding: 1em 1em 2em 1em;
`

export const EditCollectionForm = ({
  collection,
}: EditDatacollectionFormProps) => {
  const router = useRouter()
  const [backendError, setBackendError] = useState()
  const [updateCollection] = useUpdateCollectionMutation()
  const { register, handleSubmit, formState, watch, setValue, control } =
    useForm({
      resolver: yupResolver(updateCollectionValidation),
      defaultValues: {
        name: collection.name,
        description: collection.description,
        keywords: collection.keywords,
      },
    })

  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }

  const { errors } = formState
  const onSubmit = (requestData: any) => {
    updateCollection({
      variables: { id: collection.id, input: requestData },
      awaitRefetchQueries: true,
      refetchQueries: ['Collection'],
    }).then(() => {
      setBackendError(undefined)
      router.push(`/collection/${collection.id}`)
    })
  }
  {
    backendError ? (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    ) : null
  }
  return (
    <Container>
      <Collection>
        <TopBar type={'Collection'}>
          <Name>Rediger datasamling</Name>
        </TopBar>
        <CollectionBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend="" errorPropagation={false}>
              <TextField
                id="name"
                label="Navn"
                {...register('name')}
                error={errors.name?.message}
              />
              <KeywordsInput
                keywords={keywords}
                setKeywords={setKeywords}
                {...register('keywords')}
                error={errors.keywords?.[0].message}
              />
            </Fieldset>
            <RightJustifiedSubmitButton
              onCancel={() => router.push(`/collection/${collection.id}`)}
            />
          </form>
        </CollectionBody>
      </Collection>
    </Container>
  )
}
