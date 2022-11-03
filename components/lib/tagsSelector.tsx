import * as React from 'react'
import { Label, Select, TextField } from '@navikt/ds-react'
import {
  useKeywordsQuery,
  useTeamkatalogenQuery,
} from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { Dropdown } from '@navikt/ds-react-internal'
import CreatableSelect from 'react-select/creatable'
import { CONTINUOUS_DOMAIN_SCALES } from 'vega-lite/build/src/scale'
import classNames from 'classnames'
import { ActionMeta, StylesConfig, ThemeConfig } from 'react-select'
import { stringToColorClasses, stringToColors } from '../../lib/stringUtils'
import cl from 'clsx'
import { UserState } from '../../lib/context'

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
    color: stringToColors(data.value)[1],
    backgroundColor: stringToColors(data.value)[0],
    border: '1px solid',
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
  console.log(tagsMap)
  if (!error) {
    data?.keywords.forEach((it) =>
      tagsMap.set(it.keyword, it.count + (tagsMap.get(it.keyword) || 0))
    )
  }
  console.log(tagsMap)
  return Array.from(tagsMap.entries())
    .sort((l, r) => r[1] - l[1])
    .map((it) => it[0])
}

export const TagsSelector = ({onAdd, onDelete, tags}: TagsSelectorProps) => {
  let tagOptions = useBuildTagOptionsList()

  const onChangeInput = (_: any, actionMeta: ActionMeta<TagOption>)=> {
    console.log(actionMeta)
    switch(actionMeta.action){
      case 'pop-value':
      case 'remove-value':
        onDelete(actionMeta.removedValue.value)
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
        className={cl('navds-form-field__label', {
          'navds-sr-only': false,
        })}
      >
        Nøkkelord
      </Label>
      <CreatableSelect
        isMulti
        options={tagOptions.map((it) => ({
          value: it,
          label: it,
        }))}
        styles={styles}
        theme={theme}
        placeholder="Legg til nøkkelord"
        onChange={onChangeInput}
        defaultValue= {tags.map(it=> ({
          value:it,
          label:it,
        }))}
        isClearable={false}
      />
    </div>
  )
}
export default TagsSelector
