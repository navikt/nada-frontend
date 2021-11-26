import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { SubjectType, useGrantAccessMutation } from './graphql'

export const bigQuery = yup.object().shape({
  projectID: yup.string().required(),
  dataset: yup.string().required(),
  table: yup.string().required(),
})

export const updateDataproductValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  teamkatalogenURL: yup.string().url(),
  pii: yup
    .boolean()
    .required('Inneholder datasettet personidentifiserende informasjon?'),
})

export const newDataproductValidation = updateDataproductValidation.concat(
  yup.object().shape({
    group: yup.string(),
    bigquery: bigQuery,
  })
)

export const owner = yup.object().shape({
  group: yup.string().required('trenger teamnavn'),
  teamkatalogen: yup.string(),
})

export const updateCollectionValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  keywords: yup.array().of(yup.string()),
})

export const newCollectionValidation = updateCollectionValidation.concat(
  yup.object().shape({
    group: yup.string().required('trenger teamnavn'),
  })
)

export const addRequesterValidation = yup.object().shape({
  subject: yup
    .string()
    .email('Gyldig epost for gruppe eller bruker')
    .required('Gruppe- eller person-email'),
})

export const addAccessValidation = yup.object().shape({
  expires: yup.string(),
})
