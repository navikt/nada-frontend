import {useRouter} from "next/router";
import {useQuartoQuery} from "../../../lib/schema/graphql";
import ErrorMessage from "../../../components/lib/error";
import LoaderSpinner from "../../../components/lib/spinner";
import * as React from "react";
import InnerHTML from 'dangerously-set-html-content'
import InnerContainer from "../../../components/lib/innerContainer";

const QuartoPage = () => {
    const router = useRouter()
    const id = router.query.id as string

    const query = useQuartoQuery({ variables: { id } })

    if (query.error) return <ErrorMessage error={query.error}/>
    if (query.loading || !query.data) return <LoaderSpinner/>

    const quarto = query.data.quarto.content

    return <InnerContainer>
        <InnerHTML html={quarto} />
        </InnerContainer>
}

export default QuartoPage