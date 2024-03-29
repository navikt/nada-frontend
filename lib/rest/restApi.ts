import { SearchOptions } from "./search"

const isServer = typeof window === 'undefined'

export const apiUrl = () => {
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return 'http://localhost:8080/api'
  }
  return isServer ? 'http://nada-backend/api' : '/api'
}

export const getDataproductUrl = (id: string) => `${apiUrl()}/dataproducts/${id}`
export const getDatasetUrl = (id: string) => `${apiUrl()}/datasets/${id}`
export const getProductAreasUrl = () => `${apiUrl()}/productareas`
export const getProductAreaUrl = (id: string) => `${apiUrl()}/productareas/${id}`
export const searchTeamKatalogenUrl = (gcpGroups?: string[]) => {
  const parameters = gcpGroups?.length ? gcpGroups.map(group => `gcpGroups=${encodeURIComponent(group)}`).join('&') : ''
  const query = parameters ? `?${parameters}` : ''
  return `${apiUrl()}/teamkatalogen${query}`
}

export const searchUrl = (options: SearchOptions) => {
  let queryParams: string[] = [];

  // Helper function to add array-based options
  const addArrayOptions = (optionArray: string[] | undefined, paramName: string) => {
    if (optionArray && optionArray.length) {
      queryParams.push(`${paramName}=${optionArray.reduce((s, p) => `${s ? `${s},` : ""}${encodeURIComponent(p)}`)}`)
    }
  };

  // Adding array-based options
  addArrayOptions(options.keywords, 'keywords');
  addArrayOptions(options.groups, 'groups');
  addArrayOptions(options.teamIDs, 'teamIDs');
  addArrayOptions(options.services, 'services');
  addArrayOptions(options.types, 'types');

  // Adding single-value options
  if (options.text) queryParams.push(`text=${encodeURIComponent(options.text)}`);
  if (options.limit !== undefined) queryParams.push(`limit=${options.limit}`);
  if (options.offset !== undefined) queryParams.push(`offset=${options.offset}`);

  const query = queryParams.length ? `?${queryParams.join('&')}` : '';
  return `${apiUrl()}/search${query}`;
};

