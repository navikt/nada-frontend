import * as React from 'react'
import {useGroupStatsQuery, useKeywordsQuery} from "../../lib/schema/graphql";
//import {Checkbox, CheckboxGroup, Select} from "@navikt/ds-react";
import {FilterTypes} from "../../pages/category/index";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {FormEvent, useState} from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

interface SideMenuProps {
    updateQuery: (key: string, value: string | string[], remove?: boolean) => void
    filters: FilterTypes
}

const SideMenu = ({updateQuery, filters}: SideMenuProps) => {
    const groupStatsQuery = useGroupStatsQuery()
    const keywordsQuery = useKeywordsQuery()
    const unselectedGroups = groupStatsQuery.data?.groupStats.map((g: any) => g.email).filter((t) => !filters.groups.includes(t)) || []
    const unselectedKeywords = keywordsQuery.data?.keywords.map((k) => k.keyword).filter((k) => !filters.keywords.includes(k)) || []
    const [value, setValue] = useState<string>(filters.text)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        updateQuery("text", value)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateQuery("types", event.target.name)
    };

    return (<div>
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Vis</FormLabel>
            <FormGroup>
                {[
                    {name: 'product', label: "Dataprodukter"},
                    {name: 'story', label: "Datafortellinger"},
                    {name: 'metabase', label: "Metabase"},
                ].map((type) => (
                    <FormControlLabel
                        key={type.name}
                        control={ <Checkbox checked={filters.types.includes(type.name)} onChange={handleChange} name={type.name}/>}
                        label={type.label}
                    />))}
            </FormGroup>
        </FormControl>
        <form onSubmit={onSubmit}>
            <TextField id="outlined-basic" label="søk" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} sx={{width: '100%', marginTop: '10px'}}/>
        </form>
        <Autocomplete
            sx={{marginTop: '10px'}}
            clearIcon={false}
            value={{label:"", type:""}}
            options={unselectedKeywords.map((k) => {return {label: k, type: "keywords"}}).concat(unselectedGroups.map((t) => {return {label: t, type: 'groups'}}))}
            renderInput={(params) => <TextField {...params} label="Filter" />}
            onChange={(e, value) => value && updateQuery(value.type, value.label)}
            onSubmit={(e) => {e.preventDefault();console.log(e)}}
        />

    </div>)
}

export default SideMenu
