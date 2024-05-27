import { useEffect, useState } from "react"
import { apiUrl, fetchTemplate } from "./restApi"


export const searchPolly = async (query?: string) => {
    const url= `${apiUrl()}/polly?query=${query}`
    return fetchTemplate(url)
}

export const useSearchPolly = (query?: string) => {
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if((query?.length??0) < 3) return
        setLoading(true);
        searchPolly(query).then((res) => res.json())
            .then((searchPollyDto) => {
                console.log(searchPollyDto)
            setError(null);
            setSearchResult(searchPollyDto);
        })
            .catch((err) => {
                const searchPollyDto= [{"external_id":"965f1ff3-0c50-40cf-9cb9-2682fb6160be","name":"CV utdanningsdata med fritekstfelter til SSB","url":"https://behandlingskatalog.intern.dev.nav.no/process/purpose/STATISTIKK/965f1ff3-0c50-40cf-9cb9-2682fb6160be"}]
            setError(err);
            console.log(searchPollyDto)
            setSearchResult(searchPollyDto)
        }).finally(() => {
            setLoading(false);
        })
    }, [query])
    return { searchResult, loading, searchError: error };
}