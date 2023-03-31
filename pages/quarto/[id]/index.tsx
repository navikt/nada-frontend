import {useRouter} from "next/router";
import * as React from "react";
import InnerHTML from 'dangerously-set-html-content'

const QuartoPage = () => {
    const router = useRouter()
    const id = router.query.id as string

    //THE BACKEND HAS DELETED THE QUARTO QUERY, SO WE HAVE TO COMMENT THIS OUT BEFORE
    //THE BACKEND IS READY WITH FETCHING QUARTO
    /*
    const query = useQuartoQuery({ variables: { id } })

    if (query.error) return <ErrorMessage error={query.error}/>
    if (query.loading || !query.data) return <LoaderSpinner/>

    const quarto = query.data.quarto.content
    return <InnerHTML className="w-full px-4 md:px-6" html={quarto} />
*/

    return <InnerHTML className="w-full px-4 md:px-6" html={"We are developing..."} />

}

export default QuartoPage