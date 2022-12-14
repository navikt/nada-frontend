import { Back, Data } from "@navikt/ds-icons"
import { Button, Heading, Modal } from "@navikt/ds-react"
import { useState } from "react"
import { ProductAreasQuery } from "../../lib/schema/graphql"
import { PAItems } from "../../pages/productArea/[id]"
import DataproductLogo from "../lib/icons/dataproductLogo"
import ExploreAreasIcon from "../lib/icons/exploreAreasIcon"

interface MobileMenuProps {
    open: boolean
    setOpen: (value: boolean) => void
    productAreaItems: PAItems
    setCurrentItem: (newCurrent: number) => void
    productAreas: ProductAreasQuery['productAreas']
    selectProductArea: (productAreaId: string) => void
}

const ProductAreaMobileMenu = ({ open, setOpen, productAreaItems, setCurrentItem, productAreas, selectProductArea }: MobileMenuProps) => {
    /*
        åpne meny :)
            - åpner modal med liste over produktområde
        velge et produktområde
            - endrer po-liste til liste over po + team
        velge et team (eller po)
            - lukker modal og navigerer til team-view (eller po-view)
    */

    const [selected, setSelected] = useState<string | null>(null)


    return <Modal className="w-screen py-8" open={open} onClose={() => setOpen(false)}>
        {!selected && <div className="flex flex-wrap mt-14 gap-2 mx-2">
            {productAreas.map((area, idx) => <a
                href="#"
                onClick={() => { setSelected(area.id); selectProductArea(area.id) }}
                key={idx}
                className="w-[calc(50%-4px)] px-2 aspect-square border-2 rounded border-border-inverted flex flex-col justify-center items-center">
                <Heading level="2" size="medium" className="shrink">{area.name}</Heading>
            </a>)}</div>
        }
        {selected && <div>
            <Button className="absolute top-4 left-4 h-9" variant="tertiary" icon={<Back aria-hidden />} onClick={() => setSelected(null)}>Tilbake</Button>
            <div className="gap-2 mt-16 mx-4">
                {productAreaItems.map((d, idx) => d.stories.length || d.dataproducts.length ? (
                    <a
                        href="#"
                        onClick={() => { setCurrentItem(idx); setOpen(false)}}
                        key={idx}
                        className={`${idx == 0 ? "pl-0" : "pl-4"} flex`}
                        >
                        <Heading level="2" size="medium" className="shrink">{d.name}</Heading>
                    </a>
                ) : (
                    <div className={`${idx == 0 ? "pl-0" : "pl-4"} flex`}>
                        <Heading level="2" size="medium" className="shrink">{d.name}</Heading>
                    </div>
                )
                )}
            </div>
        </div>}
    </Modal>
}

export default ProductAreaMobileMenu