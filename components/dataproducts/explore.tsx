import {DataproductQuery, MappingService, useUpdateMappingMutation} from "../../lib/schema/graphql";
import ExploreLink, {ItemType} from "./exploreLink";
import styled from "styled-components";
import {useState} from "react";
import ErrorMessage from "../lib/error";

const ExploreLinks = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  > * {
  margin: 0 10px 15px; 
  }

`

interface ExploreProps {
    product: DataproductQuery['dataproduct']
    isOwner: boolean
}

const Explore = ({product, isOwner}: ExploreProps) => {
    const [formError, setFormError] = useState(undefined)

    const [updateMapping] = useUpdateMappingMutation()

    const addToMetabase = async () => {
        console.log("clicked to add")
/*
        try{
            await updateMapping({
                variables: {dataproductID: product.id, services: [MappingService.Metabase]},
                refetchQueries: ['Dataproduct'],
            })

        } catch (e: any) {
            setFormError(e)
        }
*/
    }

    const removeFromMetabase = async () => {
        console.log("clicked to remove")
        try{
            await updateMapping({
                variables: {dataproductID: product.id, services: []},
                refetchQueries: ['Dataproduct'],
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
                <ExploreLink url={bigQueryUrl} type={ItemType.bigQuery} title='Åpne i Google Cloud Console'/>
                {services.metabase &&
                <ExploreLink url={services.metabase} type={ItemType.metabase} title='Åpne i Metabase'/>
                }
            </ExploreLinks>
            {isOwner &&
            <>
                <hr/>
                <ExploreLinks>
                    {!mappings.includes(MappingService.Metabase) &&
                    <ExploreLink type={ItemType.addToMetabase} onClick={addToMetabase} title='Legg til i Metabase'/>}
                    {mappings.includes(MappingService.Metabase) && !services.metabase &&
                    <ExploreLink type={ItemType.metabase} loading={true} title='legger til i Metabase' description='Dette kan ta noen minutter'/>}
                    {mappings.includes(MappingService.Metabase) && services.metabase &&
                    <ExploreLink type={ItemType.removeFromMetabase} onClick={removeFromMetabase}
                                 title='Fjern fra Metabase'/>}

                </ExploreLinks>
            </>
            }
            {formError &&
            <ErrorMessage error={formError}/>
            }
        </>)

}
export default Explore