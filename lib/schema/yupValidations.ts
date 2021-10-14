import * as yup from 'yup'

export const dataproductOwner = yup.object().shape({
  team: yup.string().required('trenger teamnavn'),
})

export const newDataproductValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  dataproduct_id: yup
    .string()
    .required('Datasett må kobles til et dataprodukt'),
  pii: yup
    .boolean()
    .required('Inneholder datasettet personidentifiserende informasjon?'),
  bigquery: yup.object().shape({
    project_id: yup.string().required('Du må oppgi prosjektid'),
    dataset: yup.string().required('Du må oppgi datasettnavn'),
    table: yup.string().required('Du må oppgi tabellnavn'),
  }),
})

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

export const datacollectionValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  owner: dataproductOwner,
  keywords: yup.array().of(yup.string()),
})

export const updateDatacollectionValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  keywords: yup.array().of(yup.string()),
})

export const newDatacollectionValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  owner: dataproductOwner,
  keywords: yup.array().of(yup.string()),
})
