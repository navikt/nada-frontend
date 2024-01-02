import { Loader } from "@navikt/ds-react";
import { useRouter } from "next/router"
import { EditStoryMetadataForm } from "../../../components/stories/editStoryMetadata";
import { useDataStoryQuery } from "../../../lib/schema/graphql";

const EditStoryPage = ()=>{
    const router = useRouter()
    const id = router.query.id;
    const storyQuery = useDataStoryQuery({variables: {id:id as string}})
    if(storyQuery.error){
        return <div>{storyQuery.error.message}</div>
    }

    if(storyQuery.loading || !storyQuery.data){
        return <Loader></Loader>
    }
    const story = storyQuery.data.dataStory
    return <div>
        <EditStoryMetadataForm 
            id={id as string} 
            name={story.name} 
            description={story.description} 
            keywords={story.keywords} 
            teamkatalogenURL={story.teamkatalogenURL || ""} 
            group={story.group} />
    </div>
}

export default EditStoryPage;