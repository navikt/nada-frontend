import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import ReactTags, { Tag } from 'react-tag-autocomplete'

export interface KeywordsInputProps {
  keywords?: string[]
  setKeywords: (value: string[]) => void
  error?: string
}

// FIXME: Denne komponenten bør kunne ta onChange og value som props
// for sømløs integrasjon med useForm
export const KeywordsInput = ({
  keywords,
  setKeywords,
  error,
}: KeywordsInputProps) => {
  const [tags, setTags] = useState<Tag[]>(
    keywords ? keywords.map((k, i) => ({ id: i, name: k })) : []
  )

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex))
    },
    [tags]
  )

  const onAddition = useCallback(
    (newTag) => {
      setTags([...tags, newTag])
    },
    [tags]
  )

  useEffect(() => setKeywords(tags.map((x) => x.name)), [tags])

  return (
    <>
      <ReactTags
        tags={tags}
        onDelete={onDelete}
        onAddition={onAddition}
        allowNew
      />
      {error && <p>{error}</p>}
    </>
  )
}

export default KeywordsInput
