import { useEffect, useState } from "react";
import { createDataproductUrl, deleteDataproductUrl, deleteTemplate, fetchTemplate, getDataproductUrl, getDatasetUrl, mapDatasetToServicesUrl, postTemplate, putTemplate, updateDataproductUrl } from "./restApi";

const getDataproduct = async (id: string) => {
    const url = getDataproductUrl(id);
    return fetchTemplate(url)
}

const getDataset = async (id: string) => {
    const url = getDatasetUrl(id);
    return fetchTemplate(url)
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

export const createDataproduct = async (dp: any) => {
    const url = createDataproductUrl();
    return postTemplate(url, dp).then((res)=>res.json());
}

export const updateDataproduct = async (id: string, dp: any) => {
    const url = updateDataproductUrl(id);
    return putTemplate(url, dp).then((res)=>res.json());
}

export const deleteDataproduct = async (id: string) => {
    const url = deleteDataproductUrl(id);
    return deleteTemplate(url).then((res)=>res.json());
}

export const mapDatasetToServices = (id: string, services: string[])=>{
    const url = mapDatasetToServicesUrl(id);
    return postTemplate(url, {
        services}).then((res)=>res.json());
}