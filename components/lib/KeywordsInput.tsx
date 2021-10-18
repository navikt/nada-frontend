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
      flex-direction: column-reverse;
    }
    .react-tags__search {
      margin-bottom: 8px;
    }

    .navds-text-field__input {
      width: 100% !important;
    }

    .react-tags__selected-tag {
      margin-right: 8px;
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

  const classNames = {
    root: 'react-tags',
    rootFocused: 'is-focused',
    selected: 'react-tags__selected',
    selectedTag: 'react-tags__selected-tag',
    selectedTagName: 'react-tags__selected-tag-name',
    search: 'react-tags__search',
    searchWrapper: 'react-tags__search-wrapper',
    searchInput: 'react-tags__search-input',
    suggestions: 'react-tags__suggestions',
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled',
    suggestionPrefix: 'react-tags__suggestion-prefix',
  }

  return (
    <>
      <StyledRectTags>
        <label>Nøkkelord</label>
        <ReactTags
          classNames={{ ...classNames, searchInput: 'navds-text-field__input' }}
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
