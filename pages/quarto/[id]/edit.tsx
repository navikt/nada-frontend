import { Loader } from "@navikt/ds-react";
import { useRouter } from "next/router"
import { EditQuartoStoryMetadataForm } from "../../../components/stories/editQuartoStoryMetadata";
import { useQuartoStoryQuery } from "../../../lib/schema/graphql";

const EditQuartoPage = ()=>{
    const router = useRouter()
    const id = router.query.id;
    const quartoQuery = useQuartoStoryQuery({variables: {id:id as string}})
    if(quartoQuery.error){
        return <div>{quartoQuery.error.message}</div>
    }

    if(quartoQuery.loading || !quartoQuery.data){
        return <Loader></Loader>
    }
    const quartoStory = quartoQuery.data.quartoStory
    return <div>
        <EditQuartoStoryMetadataForm 
            id={id as string} 
            name={quartoStory.name} 
            description={quartoStory.description} 
            keywords={quartoStory.keywords} 
            teamkatalogenURL={quartoStory.teamkatalogenURL || ""} 
            group={quartoStory.group} />
    </div>
}

export default EditQuartoPage;