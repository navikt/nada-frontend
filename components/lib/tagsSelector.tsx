import { Close } from '@navikt/ds-icons'
import { Label } from '@navikt/ds-react'
import * as React from 'react'
import { useContext } from 'react'
import { ActionMeta, StylesConfig, ThemeConfig } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { UserState } from '../../lib/context'
import {
  useKeywordsQuery
} from '../../lib/schema/graphql'
import TagPill from './tagPill'

export interface TagsSelectorProps {
  onAdd: (value: string) => void
  onDelete: (value: string) => void
  tags: string[]
}

interface TagOption {
  value: string
  label: string
}

const styles: StylesConfig<TagOption, true> = {
  control: (provided: object, state: { isFocused: any }) => ({
    ...provided,
    border: state.isFocused ? '3px solid #00347d' : '1px solid',
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    padding: '0 0 0 0 !important',
    margin: '0 0 0 0 !important',
    width: '0px',
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    padding: '0 0 0 0 !important',
    margin: '0 0 0 0 !important',
    width: '0px',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    padding: '0 0 0 0 !important',
    margin: '0 0 0 0 !important',
    width: '0px',
  }),
}

const theme: ThemeConfig = (t) => ({
  ...t,
  colors: {
    ...t.colors,
    neutral30: '#0067c5',
    neutral20: '#707070',
    primary: '#00347d',
  },
  spacing: {
    ...t.spacing,
    baseUnit: 3,
    controlHeight: 50,
  },
})

const useBuildTagOptionsList = () => {
  const { data, error } = useKeywordsQuery()
  const userInfo = useContext(UserState)
  let tagsMap = new Map(
    userInfo?.dataproducts
      ?.flatMap((it) => it.keywords)
      .map((it) => [it, 100000])
  )
  if (!error) {
    data?.keywords.forEach((it) =>
      tagsMap.set(it.keyword, it.count + (tagsMap.get(it.keyword) || 0))
    )
  }
  return Array.from(tagsMap.entries())
    .sort((l, r) => r[1] - l[1])
    .map((it) => it[0])
}

export const TagsSelector = ({ onAdd, onDelete, tags }: TagsSelectorProps) => {
  let tagOptions = useBuildTagOptionsList()

  const onChangeInput = (_: any, actionMeta: ActionMeta<TagOption>) => {
    switch (actionMeta.action) {
      case 'pop-value':
      case 'remove-value':
        if (actionMeta.removedValue) {
          onDelete(actionMeta.removedValue.value)
        }
        break
      case 'select-option':
      case 'create-option':
        actionMeta.option && onAdd(actionMeta.option.value)
        break
      default:
        console.log(`Unsupported action ${actionMeta.action}`)
    }
  }

  return (
    <div>
      <Label
        htmlFor={'0'}
        size={'medium'}
        className={'navds-text-field__label navds-label'}
      >
        Nøkkelord
      </Label>
        <div className="flex flex-row gap-1 flex-wrap w-full mt-1 mb-1">
          {tags && tags.map((k, i) => {
            return (
              <TagPill
                key={i}
                keyword={k}
                onClick={() => onDelete(k)}
                remove={true}
                horizontal={true}
              >
                {k}
              </TagPill>
            )
          })}
        </div>
      <CreatableSelect
        isMulti
        options={tagOptions.map((it) => ({
          value: it,
          label: it,
        }))}
        styles={styles}
        theme={theme}
        closeMenuOnSelect={false}
        placeholder="Legg til nøkkelord"
        onChange={onChangeInput}
        value={tags.map((it) => ({
          value: it,
          label: it,
        }))}
        isClearable={false}
      />
    </div>
  )
}
export default TagsSelector
