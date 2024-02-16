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

const enrichProductArea = (productArea: any) => {
    return {
        ...productArea,
        dataproductsNumber: productArea.teams.reduce((acc: number, t: any) => acc + t.dataproductsNumber, 0),
        storiesNumber: productArea.teams.reduce((acc: number, t: any) => acc + t.storiesNumber, 0),
        insightProductsNumber: productArea.teams.reduce((acc: number, t: any) => acc + t.insightProductsNumber, 0),
    }

}

export const useGetProductAreas = () => {
    const [productAreas, setProductAreas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProductAreas().then((res) => res.json())
            .then((productAreaDto) => {
            setError(null);
            setProductAreas([...productAreaDto.productAreas.map(enrichProductArea)]);
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