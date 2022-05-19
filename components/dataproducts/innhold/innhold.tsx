import { QueryResult } from "@apollo/client";
import { DataproductAccessQuery, DataproductQuery, Exact, UserInfoDetailsQuery } from "../../../lib/schema/graphql";
import DatasettEntry from "./datasettEntry";

interface PropsEntry {
    product: DataproductQuery['dataproduct'],
    access: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

interface InnholdProps {
    products: Array<PropsEntry>,
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
}

const Innhold = ({products, userInfo}: InnholdProps) => {
    return <>
        {
            products.map((entry, idx) => 
                <DatasettEntry key={idx} product={entry.product} access={entry.access} userInfo={userInfo} />
            )
        }
    </>
}


export default Innhold