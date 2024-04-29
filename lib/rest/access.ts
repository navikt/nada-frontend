import { useEffect, useState } from "react";
import { approveAccessRequestUrl, denyAccessRequestUrl, fetchAccessRequestUrl, fetchTemplate, postTemplate } from "./restApi";

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

export const apporveAccessRequest = async (accessRequestId: string) => {
    const url = approveAccessRequestUrl(accessRequestId);
    return postTemplate(url);
}

export const denyAccessRequest = async (accessRequestId: string, reason: string) => {
    const url = denyAccessRequestUrl(accessRequestId, reason);
    return postTemplate(url);
}