import ReactTags from 'react-tag-autocomplete'
import styled from 'styled-components'
import KeywordPill from "./keywordList";


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
export interface KeywordsInputProps {
  error?: string,
  onAdd: (value: string) => void,
  onDelete: (value: string) => void,
  keywords: string[],
}

export const KeywordsInput = ({
  error,
  onAdd,
  onDelete,
  keywords,
}: KeywordsInputProps) => {

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
          onDelete={() => {}}
          onAddition={(tag) => onAdd(tag.name)}
          placeholderText={'nøkkelord (trykk enter for å legge til)'}
          allowNew
        />
      </StyledRectTags>
      {keywords.map((k, i) => {
        return <KeywordPill key={i} keyword={k} onClick={() => onDelete(k)} remove={true}>{k}</KeywordPill>
      })}
      {error && <p>{error}</p>}
    </>
  )
}

export default KeywordsInput
