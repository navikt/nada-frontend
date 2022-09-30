import * as React from 'react'
import { FormEvent, useState } from 'react'
import {
  MappingService,
  SearchType,
  useGroupStatsQuery,
  useKeywordsQuery,
} from '../../lib/schema/graphql'
import { Close } from '@navikt/ds-icons'
import { emailToValue, FilterTypes } from '../../pages/search'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Autocomplete, IconButton, TextField } from '@mui/material'

interface SideMenuProps {
  updateQuery: (key: string, value: string | string[], remove?: boolean) => void
  filters: FilterTypes
}

const SideMenu = ({ updateQuery, filters }: SideMenuProps) => {
  const groupStatsQuery = useGroupStatsQuery()
  const keywordsQuery = useKeywordsQuery()
  const unselectedGroups =
    groupStatsQuery.data?.groupStats
      .map((g: any) => g.email)
      .filter((t) => !filters.groups.includes(t)) || []
  const unselectedKeywords =
    keywordsQuery.data?.keywords
      .map((k) => k.keyword)
      .filter((k) => !filters.keywords.includes(k)) || []
  const [value, setValue] = useState<string>(filters.text)

  const onSubmit = (e: FormEvent, clear?: boolean) => {
    e.preventDefault()
    if (clear) {
      setValue('')
      updateQuery('text', '')
    } else {
      updateQuery('text', value)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          InputProps={{
            endAdornment: value ? (
              <IconButton
                size="small"
                onClick={(e) => {
                  onSubmit(e, true)
                }}
              >
                <Close />
              </IconButton>
            ) : undefined,
          }}
          id="outlined-basic"
          label="søk"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ width: '100%', marginBottom: '10px' }}
        />
      </form>
      <FormControl component="fieldset" variant="standard">
        {!!Object.values(MappingService).length && (
          <FormLabel component="legend" focused={false}>
            Integrasjoner
          </FormLabel>
        )}
      </FormControl>
      <Autocomplete
        sx={{ marginTop: '10px' }}
        clearIcon={false}
        value={{ label: '', type: '', data: '' }}
        options={unselectedGroups
          .map((t) => {
            return { label: emailToValue(t), type: 'groups', data: t }
          })
          .concat(
            unselectedKeywords.map((k) => {
              return { label: k, type: 'keywords', data: k }
            })
          )}
        renderInput={(params) => <TextField {...params} label="Filter" />}
        onChange={(e, value) => value && updateQuery(value.type, value.data)}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      />
    </div>
  )
}

export default SideMenu
