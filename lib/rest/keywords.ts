import { useEffect, useState } from "react"
import { fetchKeywordsUrl } from "./restApi"

export const fetchKeywords = async () => {
    const url = fetchKeywordsUrl()
    return fetch(url)
}

export const useFetchKeywords = () => {
    const [keywordsList, setKeywordsList] = useState<any>(undefined)
    useEffect(() => {
        fetchKeywords().then((res) => res.json())
            .then((keywordsList) => {
            setKeywordsList(keywordsList)
        })
            .catch((err) => {
            setKeywordsList({
                keywordItems: [],
            })
        })
    }, [])
    return keywordsList
}