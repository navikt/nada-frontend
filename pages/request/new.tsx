import * as React from 'react'
import Head from 'next/head'
import {NewAccessRequest, SubjectType, useUserInfoDetailsQuery} from '../../lib/schema/graphql'
import NewAccessRequestForm from "../../components/dataproducts/accessRequest/newAccessRequest";
import {useRouter} from "next/router";

const AccessRequestNew = () => {
    const { query } = useRouter()
    const dataproductID = query.dataproductID as string
    const userInfo = useUserInfoDetailsQuery()

    if (!userInfo.data?.userInfo)
        return (
            <div>
                <h1>Du må være logget inn!</h1>
                <p>Bruk login-knappen øverst.</p>
            </div>
        )

    const defaultValues: NewAccessRequest = {
        owner: userInfo.data.userInfo.email,
        dataproductID: dataproductID,
        expires: "",
        polly: null,
        subject: userInfo.data.userInfo.email,
        subjectType: SubjectType.User,
    }

    return (
        <>
            <Head>
                <title>ny tilgangssøknad</title>
            </Head>
            <NewAccessRequestForm newAccessRequest={defaultValues}/>
        </>
    )
}

export default AccessRequestNew
