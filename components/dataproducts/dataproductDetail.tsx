import {DataproductSchema} from '../../lib/schema/schema_types'
import {format, parseISO} from 'date-fns'
import {nb} from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'
import {useState} from "react";
import {Button} from "@navikt/ds-react";
import {EditDataProductForm} from "./editDataproductForm";
import {apiPOST} from "../../lib/api/post";
import DatasetList from "./datasetList";
import styled from "styled-components";

export interface DataproductDetailProps {
    product: DataproductSchema
}

const StyledEdit = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

const onSubmit =  (requestData: any) => {
        //const createdProduct = await apiPOST(`/api/dataproducts`, requestData)
    console.log("sssaaavvee")

}



export const DataProductDetail = ({product}: DataproductDetailProps) => {
    const humanizeDate = (isoDate: string) =>
        format(parseISO(isoDate), 'PPPP', {locale: nb})

    const [edit, setEdit] = useState(false)

    return (
        edit ? <EditDataProductForm onSubmit={onSubmit} dataproduct={product}/> :
        <div>
            <StyledEdit>
                <h1>{product.name}</h1>
                <Button onClick={()=>setEdit(true)} >Edit</Button>
            </StyledEdit>
            <p>
                Opprettet: {humanizeDate(product.created)} &ndash; Oppdatert:{' '}
                {humanizeDate(product.last_modified)}
            </p>
            <div>
                <ReactMarkdown>
                    {product.description || '*ingen beskrivelse*'}
                </ReactMarkdown>
            </div>
            <h2>Datasett i dataproduktet:</h2>
            <DatasetList productId={product.id} datasets={product.datasets}/>
        </div>
    )
}
