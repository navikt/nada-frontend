import * as yup from 'yup'

export const owner = yup.object().shape({
  group: yup.string().required('trenger teamnavn'),
  teamkatalogen: yup.string(),
})

export const bigQuery = yup.object().shape({
  project_id: yup.string().required(),
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
    owner,
    datasource: bigQuery,
  })
)

export const dataproductValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  pii: yup
    .boolean()
    .required('Inneholder datasettet personidentifiserende informasjon?'),
  bigquery: yup.object().shape({
    project_id: yup.string().required('Du må oppgi prosjektid'),
    dataset: yup.string().required('Du må oppgi datasettnavn'),
    table: yup.string().required('Du må oppgi tabellnavn'),
  }),
})

export const updateDataproductCollectionValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  keywords: yup.array().of(yup.string()),
})

export const newDataproductCollectionValidation =
  updateDataproductCollectionValidation.concat(
    yup.object().shape({
      owner,
    })
  )
