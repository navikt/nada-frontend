import * as React from 'react'
import { Detail, Heading, Link } from '@navikt/ds-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CoApplicant, Table } from '@navikt/ds-icons'
import { ProductAreasQuery, TeamkatalogenQuery, useDeleteInsightProductMutation, useDeleteQuartoStoryMutation } from '../../lib/schema/graphql'
import humanizeDate from '../../lib/humanizeDate'
import DeleteModal from '../lib/deleteModal'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { USER_INFO } from '../../lib/queries/userInfo/userInfo'
import { GET_PRODUCT_AREAS } from '../../lib/queries/productAreas/productAreas'

export interface SearchResultProps {
  resourceType?: string
  link: string
  id?: string
  name: string
  innsiktsproduktType?: string
  group?: {
    group?: string | null,
    teamkatalogenURL?: string | null
  } | null
  keywords?: string[]
  type?: string
  description?: string
  datasets?: {
    name: string
    datasource: {
      lastModified: string,
    }
  }[]
  teamkatalogen?: TeamkatalogenQuery,
  productAreas?: ProductAreasQuery,
  editable?: boolean,
  deleteResource?: (id: string) => Promise<any>,
}

export const SearchResultLink = ({
  resourceType,
  link,
  id,
  type,
  name,
  innsiktsproduktType,
  group,
  description,
  datasets,
  teamkatalogen,
  productAreas,
  editable,
  deleteResource
}: SearchResultProps) => {
  const [modal, setModal] = useState(false)

  const tk = teamkatalogen?.teamkatalogen.find((it) => it.url == group?.teamkatalogenURL)
  const po = productAreas?.productAreas.find((it) => it.id == tk?.productAreaID)
  const owner = tk?.name || group?.group
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined)
  const [deleteInsightProductMutation] = useDeleteInsightProductMutation();

  const editResource = () => {
    if (type == 'QuartoStory') {
      router.push(`/quarto/${id}/edit`)
    } else if (type == 'InsightProduct') {
      router.push(`/insightProduct/edit?id=${id}`)
    }
  }
  const openDeleteModal = () => setModal(true)

  const deleteInsightProduct = (id: string)=>{
    return deleteInsightProductMutation({
      variables:{
        id: id
      },
      refetchQueries:[
        {
          query: GET_PRODUCT_AREAS,
        },
        {
          query: USER_INFO,
        }
      ]
    })
  }

  const confirmDelete = () => {
    console.log(type)
    const deletePromise = type == "InsightProduct"?
      deleteInsightProduct(id || ''):
    deleteResource?.(id || '');
    console.log(deletePromise)
    deletePromise?.then(() => {
      setModal(false)
    }).catch((reason) => {
      setError(reason.toString())
    })
  }

  return (
    <div>
      <DeleteModal
        open={modal}
        onCancel={() => setModal(false)}
        onConfirm={confirmDelete}
        name={name}
        error={error || ''}
        resource={resourceType || ''}
      />
      <Link href={link} className="nada-search-result w-[47rem]">
        <div className="flex flex-col w-full px-4 py-2 gap-2">
          <div className="flex flex-col">
            <div className='flex flex-row justify-between'>
              <div>
                {
                  // have to ignore in order to use dangerouslySetInnerHTML :(
                  //@ts-ignore
                  <Heading className="text-text-action" level="2" size="small"
                    dangerouslySetInnerHTML={{ __html: `${name.replaceAll("_", "_<wbr>")} ${innsiktsproduktType ? '(' + innsiktsproduktType + ')' : ''}` }} />
                }
              </div>
              {editable && <div>
                <Link className="m-2" href="#" onClick={editResource}
                >Endre beskrivelse</Link>
                <Link className='m-2' href="#" onClick={openDeleteModal}>Slett</Link>
              </div>}
            </div>
            <Detail className="flex gap-2 items-center text-text-subtle"><CoApplicant /> {owner + `${po ? " - " + po.name : ""}`}</Detail>
          </div>
          <div className="flex flex-col gap-4">
            {description && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'code', 'pre']}
                unwrapDisallowed={true}
              >
                {description.split(/\r?\n/).slice(0, 4).join('\n').replace("((START))", "_").replace("((STOP))", "_")}
              </ReactMarkdown>
            )}
            {datasets && !!datasets.length && (
              <div>
                <Heading size="xsmall" level="3" className="flex items-center gap-2"><Table /> Datasett</Heading>
                <div className='ml-[1.6rem] flex flex-col gap-2'>
                  {datasets.map((ds, index) => (
                    <div key={index}>
                      <p dangerouslySetInnerHTML={{ __html: ds.name.replaceAll("_", "_<wbr>") }} />
                      <Detail className="text-text-subtle">Sist oppdatert: {humanizeDate(ds.datasource.lastModified)}</Detail>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SearchResultLink
