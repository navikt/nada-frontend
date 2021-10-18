import { useCallback, useEffect, useState } from 'react'
import ReactTags, { Tag } from 'react-tag-autocomplete'
import styled from 'styled-components'
import classNames from 'classnames'
import { navLilla } from '../../styles/constants'

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
  const StyledRectTags = styled.div`
    margin-top: 8px;
    label {
      box-sizing: border-box;
      color: rgb(38, 38, 38);
      font-family: 'Source Sans Pro', Arial, sans-serif;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: normal;
      line-height: 24px;
      margin-bottom: 0px;
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 0px;
    }

    .react-tags {
      margin-top: 8px;
      display: flex;
    }
    .react-tags__search {
      width: 100%;
    }

    .react-tags__search-input {
      width: 100% !important;
      appearance: none;
      background-color: rgb(255, 255, 255);
      border-radius: 4px;
      box-sizing: border-box;
      color: rgb(0, 0, 0);
      font-family: 'Source Sans Pro', Arial, sans-serif;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: normal;
      line-height: 24px;
      min-height: 48px;
      padding-bottom: 8px;
      padding-left: 8px;
      padding-right: 8px;
      padding-top: 8px;
    }

    .react-tags__selected-tag {
      appearance: none;
      background-color: #ffd799;
      border: none;
      border-radius: 16px;
      padding: 0.25em 0.75em;
      display: inline-flex;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  `

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
      <StyledRectTags>
        <label>Nøkkelord</label>
        <ReactTags
          tags={tags}
          onDelete={onDelete}
          onAddition={onAddition}
          placeholderText={'nøkkelord'}
          allowNew
        />
      </StyledRectTags>
      {error && <p>{error}</p>}
    </>
  )
}

export default KeywordsInput
