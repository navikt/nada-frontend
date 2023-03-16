import * as React from 'react'
import { Detail, Heading, Link } from '@navikt/ds-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CoApplicant, Table } from '@navikt/ds-icons'
import { ProductAreasQuery, TeamkatalogenQuery, useDeleteQuartoStoryMutation} from '../../lib/schema/graphql'
import humanizeDate from '../../lib/humanizeDate'
import DeleteModal from '../lib/deleteModal'
import { useState } from 'react'
import { useRouter } from 'next/router'

export interface SearchResultProps {
  link: string
  id?: string
  name: string
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
  editable?: boolean
}

export const SearchResultLink = ({
  link,
  id,
  name,
  group,
  description,
  datasets,
  teamkatalogen,
  productAreas,
  editable
}: SearchResultProps) => {
  const [modal, setModal] = useState(false)
  const tk = teamkatalogen?.teamkatalogen.find((it) => it.url == group?.teamkatalogenURL)
  const po = productAreas?.productAreas.find((it) => it.id == tk?.productAreaID)
  const owner = tk?.name || group?.group
  const router = useRouter();
  const [error, setError] = useState<string| undefined>(undefined)

  const editQuartoStory = ()=>{
    router.push(`/quarto/${id}/edit`)
  }
  const openDeleteQuartoModal = ()=> setModal(true)

  const [deleteQuartoQuery] = useDeleteQuartoStoryMutation({
    variables: {
      id: id || ''
    }
  })

  const deleteQuarto = async () =>{
    deleteQuartoQuery().then(()=>{
      setModal(false)
    }).catch((reason)=>{
      setError(reason.toString())
    })
  }

  return (
    <div>
      <DeleteModal 
        open={modal} 
        onCancel={()=> setModal(false) } 
        onConfirm={deleteQuarto } 
        name={name}
        error={error || ''}
        resource={'datafortelling'} 
      />
      <Link href={link} className="nada-search-result w-[47rem]">
        <div className="flex flex-col w-full px-4 py-2 gap-2">
          <div className="flex flex-col">
            <div className='flex flex-row justify-between'>
              <div>
                {
                  // have to ignore in order to use dangerouslySetInnerHTML :(
                  //@ts-ignore
                  <Heading className="text-text-action" level="2" size="small" dangerouslySetInnerHTML={{ __html: name.replaceAll("_", "_<wbr>") }} />
                }
              </div>
                {editable && <div>
                  <Link className= "m-2" href="#" onClick = {editQuartoStory}
                  >Endre beskrivelse</Link>
                  <Link className='m-2' href="#" onClick = {openDeleteQuartoModal}>Slett datafortelling</Link>
                </div>}
            </div>
            <Detail className="flex gap-2 items-center text-text-subtle"><CoApplicant /> {owner + `${po ? " - "+po.name : ""}`}</Detail>
          </div>
          <div className="flex flex-col gap-4">
            {description && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'code', 'pre']}
                unwrapDisallowed={true}
              >
                {description.split(/\r?\n/).slice(0, 4).join('\n')}
              </ReactMarkdown>
            )}
            {datasets && !!datasets.length && (
              <div>
                <Heading size="xsmall" level="3" className="flex items-center gap-2"><Table /> Datasett</Heading>
                <div className='ml-[1.6rem] flex flex-col gap-2'>
                {datasets.map((ds, index) => (
                  <div key={index}>
                    <p dangerouslySetInnerHTML={{ __html: ds.name.replaceAll("_", "_<wbr>")}} />
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
