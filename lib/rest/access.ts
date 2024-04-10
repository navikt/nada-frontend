import { useEffect, useState } from "react";
import { fetchAccessRequestUrl, fetchTemplate } from "./restApi";

export const fetchAccessRequests = async (datasetId: string) => {
    const url = fetchAccessRequestUrl(datasetId);
    return fetchTemplate(url);
}

export const useFetchAccessRequestsForDataset = (datasetId: string)=>{
    const [data, setData] = useState<any>(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(()=>{
        if(!datasetId) return
        fetchAccessRequests(datasetId).then((res)=> res.json())
        .then((data)=>
        {
            setError(null)
            setData(data)
        })
        .catch((err)=>{
            setError(err)
            setData(undefined)            
        }).finally(()=>{
            setLoading(false)
        })
    }, [datasetId])

    return {data, loading, error}
}