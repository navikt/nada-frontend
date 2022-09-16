import ReactTags from 'react-tag-autocomplete'
import KeywordPill from './keywordList'

export interface KeywordsInputProps {
  error?: string
  onAdd: (value: string) => void
  onDelete: (value: string) => void
  keywords: string[]
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-col justify-start gap-2">
        <label className="navds-label">Nøkkelord</label>
        <ReactTags
          classNames={{ ...classNames, searchInput: 'navds-text-field__input' }}
          onDelete={() => {}}
          onAddition={(tag) => onAdd(tag.name)}
          placeholderText={'nøkkelord (trykk enter for å legge til)'}
          allowNew
        />
      </div>
      <div className="flex flex-row gap-1 flex-wrap w-full">
        {keywords.map((k, i) => {
          return (
            <KeywordPill
              key={i}
              keyword={k}
              onClick={() => onDelete(k)}
              remove={true}
            >
              {k}
            </KeywordPill>
          )
        })}
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default KeywordsInput
