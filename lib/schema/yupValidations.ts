import * as yup from 'yup'

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

export const updateCollectionValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  repo: yup.string(),
  keywords: yup.array().of(yup.string()),
})

export const newCollectionValidation = updateCollectionValidation.concat(
  yup.object().shape({
    group: yup.string().required('trenger teamnavn'),
  })
)
