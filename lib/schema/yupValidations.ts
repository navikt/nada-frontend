import * as yup from 'yup'

export const dataproductOwner = yup.object().shape({
  team: yup.string().required('trenger teamnavn'),
  //teamkatalog: yup.string(),
})

export const dataproductValidation = yup.object().shape({
  name: yup.string().required('Du må fylle inn navn'),
  description: yup.string(),
  slug: yup.string(),
  repo: yup.string(),
  owner: dataproductOwner,
  keywords: yup.array().of(yup.string()),
})

export const newDatasetValidation = yup.object().shape({
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
