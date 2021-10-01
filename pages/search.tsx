import {NextPage} from "next";
import {useContext} from "react";
import {SearchState} from "./_app";
import PageLayout from "../components/pageLayout";
import Results from "../components/results/results";

const ResultsPage: NextPage = () => {
    return (
        <PageLayout>
            <Results />
        </PageLayout>
    )
}
export default ResultsPage