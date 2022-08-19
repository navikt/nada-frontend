import {Button, ErrorSummary, Heading, TextField} from '@navikt/ds-react'
import {useForm} from 'react-hook-form'
import {updateDataproductValidation} from '../../lib/schema/yupValidations'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {useState} from 'react'
import TeamkatalogenSelector from '../lib/teamkatalogenSelector'
import {DataproductQuery, useUpdateDataproductMutation,} from '../../lib/schema/graphql'
import DescriptionEditor from '../lib/DescriptionEditor'
import {useRouter} from 'next/router'

interface EditDatacollectionFormProps {
  product: DataproductQuery['dataproduct']
}

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
        teamkatalogenURL: product.owner.teamkatalogenURL,
      },
    })

  const { errors } = formState
  const onSubmit = (requestData: any) => {
    updateDataproduct({
      variables: { id: product.id, input: requestData },
      awaitRefetchQueries: true,
      refetchQueries: ['Dataproduct', 'searchContent'],
    }).then(() => {
      setBackendError(undefined)
      router.push(`/dataproduct/${product.id}/${product.slug}`)
    })
  }
  {
    backendError && (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    )
  }
  return (
    <div className="pt-12">
        <Heading level="1" size="large" spacing>Rediger dataprodukt</Heading>
        <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
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
          <TeamkatalogenSelector
            group={product.owner.group}
            register={register}
            errors={errors}
            watch={watch}
          />
          <div className="flex flex-row gap-4 grow items-end">
            <Button type='button' variant='secondary' onClick={() => {router.push(`/dataproduct/${product.id}/${product.slug}`)}}>Avbryt</Button>
            <Button type='submit'>Lagre</Button>
          </div>
        </form>
        </div>
  )
}
export default EditDataproduct
