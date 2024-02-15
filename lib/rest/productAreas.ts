import { useEffect, useState } from "react";
import { getProductAreasUrl } from "./restApi";

const getProductAreas = async () => {
    const url = getProductAreasUrl();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return fetch(url, options)
}

export const useGetProductAreas = () => {
    const [productAreas, setProductAreas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProductAreas().then((res) => res.json())
            .then((productAreas) => {
            setError(null);
            setProductAreas(productAreas);
        })
            .catch((err) => {
            setError(err);
            setProductAreas([]);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
    return { productAreas, loading, error };
}