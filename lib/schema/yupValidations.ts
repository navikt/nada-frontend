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
  teamkatalogenURL: yup.string().url().nullable(),
  teamContact: yup.string(),
})

export const newDataproductValidation = updateDataproductValidation.concat(
  yup.object().shape({
    group: yup.string().required('Velg et eierteam for produktet'),
    bigquery: bigQuery,
  })
)

export const owner = yup.object().shape({
  group: yup.string().required('trenger teamnavn'),
  teamkatalogen: yup.string(),
})

export const storyValidation = yup.object().shape({
  group: yup.string().required('trenger teamnavn'),
})
