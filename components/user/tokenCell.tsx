import { EyeFilled, EyeScreenedFilled } from "@navikt/ds-icons"
import { Table } from "@navikt/ds-react"
import { useState } from "react"

const TokenCell = ({token}: {token: string}) => {
    const [hidden, setHidden] = useState(true)

    return (
        <Table.DataCell className="flex flex-row gap-2 items-center w-full">
            <div>
                {hidden 
                    ? (<EyeFilled className="cursor-pointer" onClick={() => setHidden(!hidden)} />) 
                    : (<EyeScreenedFilled className="cursor-pointer" onClick={() => setHidden(!hidden)} />)}
            </div>
            <span>{hidden 
                ? "*********" 
                : token
            }</span>
        </Table.DataCell>
    )
}

export default TokenCell