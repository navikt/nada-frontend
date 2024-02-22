import { useEffect, useState } from "react";
import { searchTeamKatalogenUrl } from "./restApi";
import { set } from "lodash";
import { de } from "date-fns/locale";

export const searchTeamKatalogen = async (gcpGroups?: string[]) => {
    const url = searchTeamKatalogenUrl(gcpGroups)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        
    }
    return fetch(url, options)
}

export const useSearchTeamKatalogen = (gcpGroups?: string[]) => {
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        searchTeamKatalogen(gcpGroups).then((res) => res.json())
            .then((searchResultDto) => {
            setError(null);
            setSearchResult(searchResultDto);
        })
            .catch((err) => {
            setError(err);
            setSearchResult([]);
        }).finally(() => {
            setLoading(false);
        })
    }, gcpGroups? [JSON.stringify(gcpGroups)]: [])
    return { searchResult, loading, error };
}
