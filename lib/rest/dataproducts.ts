import { useEffect, useState } from "react";
import { getDataproductUrl, getDatasetUrl } from "./restApi";

const getDataproduct = async (id: string) => {
    const url = getDataproductUrl(id);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return fetch(url, options)
}

const getDataset = async (id: string) => {
    const url = getDatasetUrl(id);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return fetch(url, options)
}

export const useGetDataproduct = (id: string, activeDataSetID?: string)=>{
    const [dataproduct, setDataproduct] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(()=>{
        if(!id) return
        getDataproduct(id).then((res)=> res.json())
        .then((dataproduct)=>
        {
            setError(null)
            setDataproduct(dataproduct)
        })
        .catch((err)=>{
            setError(err)
            setDataproduct(null)            
        }).finally(()=>{
            setLoading(false)
        })
    }, [id, activeDataSetID])

    return {dataproduct, loading, error}
}

export const useGetDataset = (id: string)=>{
    const [dataset, setDataset] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if(!id) return
        getDataset(id).then((res)=> res.json())
        .then((dataset)=>
        {
            setError(null)
            setDataset(dataset)
        })
        .catch((err)=>{
            setError(err)
            setDataset(null)            
        }).finally(()=>{
            setLoading(false)
        })
    }, [id])

    return {dataset, loading, error}
}