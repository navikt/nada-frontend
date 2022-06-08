import { UserInfoDetailsQuery, DataproductQuery } from "../../../lib/schema/graphql";
import DatasettEntry from "./datasettEntry";

interface InnholdProps {
    dataproduct: DataproductQuery['dataproduct'],
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
}

const Innhold = ({dataproduct, userInfo}: InnholdProps) => {
    return <>
        {
            dataproduct.datasets.map((entry, idx) => 
                <DatasettEntry key={idx} dataproduct={dataproduct} dataset={entry} userInfo={userInfo} />
            )
        }
    </>
}


export default Innhold