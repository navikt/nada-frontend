import {
    DataproductQuery,
    MappingService, useDataproductQuery,
    useUpdateMappingMutation, useExtractDataproductMutation, UserInfoDetailsQuery,
} from "../../lib/schema/graphql";
import ExploreLink, {ItemType} from "./exploreLink";
import styled from "styled-components";
import {useState} from "react";
import ErrorMessage from "../lib/error";

const ExploreLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 20px;
  a {
    text-decoration: none;
  }
`

interface ExploreProps {
    product: DataproductQuery['dataproduct']
    isOwner: boolean
    isPublic: boolean
    userInfo?: UserInfoDetailsQuery['userInfo']
}

const Explore = ({userInfo, product, isOwner, isPublic}: ExploreProps) => {
    const [formError, setFormError] = useState(undefined)
    const [updateMapping] = useUpdateMappingMutation()
    const [extractDataproduct] = useExtractDataproductMutation()
    const extract = userInfo?.dataproductExtracts.find(d => d.dataproductID === product.id && new Date(d.expired) >= new Date())
    useDataproductQuery({
        variables: { id: product.id },
        ssr: true,
        pollInterval: 30_000,
    })

    const addToMetabase = async () => {
        try{
            await updateMapping({
                variables: {dataproductID: product.id, services: [MappingService.Metabase]},
                refetchQueries: ['Dataproduct'],
            })

        } catch (e: any) {
            setFormError(e)
        }
    }

    const removeFromMetabase = async () => {
        try{
            await updateMapping({
                variables: {dataproductID: product.id, services: []},
                refetchQueries: ['Dataproduct'],
            })

        } catch (e: any) {
            setFormError(e)
        }
    }

    const requestCsv = async () => {
        try{
            await extractDataproduct({
                variables: {id: product.id},
                refetchQueries: ['UserInfo'],
            })
    
        } catch (e: any) {
            setFormError(e)
        }
    }

    const datasource = product.datasource
    const services = product.services
    const mappings = product.mappings
    const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasource.dataset}&t=${datasource.table}&p=${datasource.projectID}&page=table`
    
    return (
        <>
            <ExploreLinks>
                <ExploreLink isOwner={isOwner} url={bigQueryUrl} type={ItemType.bigQuery}/>
                <ExploreLink isOwner={isOwner} url={services.metabase} type={ItemType.metabase} add={addToMetabase} remove={removeFromMetabase} mappings={mappings}/>
                { isPublic && extract
                ? extract.ready
                    ? <ExploreLink isOwner={isOwner} isPublic={isPublic} url={extract.signedURL} type={ItemType.export}/>
                    : <ExploreLink isOwner={isOwner} isPublic={isPublic} type={ItemType.export} disabled={true}/>
                : <ExploreLink isOwner={isOwner} isPublic={isPublic} type={ItemType.export} add={requestCsv} />
                }

            </ExploreLinks>
            {formError &&
            <ErrorMessage error={formError}/>
            }
        </>)

}
export default Explore
