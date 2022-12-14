import { Back, Combifridge1, Next } from "@navikt/ds-icons"
import { Button, Heading, Modal } from "@navikt/ds-react"
import Divider from "@navikt/ds-react-internal/esm/dropdown/Menu/Divider"
import { useState } from "react"
import { ProductAreasQuery } from "../../lib/schema/graphql"
import { PAItems } from "../../pages/productArea/[id]"

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


    return <Modal className="w-screen h-screen py-8" open={open} onClose={() => setOpen(false)}>
        {!selected && <div className="flex flex-col mt-14 gap-2 mx-2">
            {productAreas.map((area, idx) => 
            <>
                {idx != 0 && <Divider />}
                <a
                    href="#"
                    onClick={() => { setSelected(area.id); selectProductArea(area.id) }}
                    key={idx}
                    className="h-10 w-full px-2 flex items-center justify-between">
                    <Heading level="2" size="medium">{area.name}</Heading>
                    <div>
                        <Next className="w-6 h-6" />
                    </div>
                </a>
            </>)}</div>
        }
        {selected && <div>
            <Button className="absolute top-4 left-4 h-9" variant="tertiary" icon={<Back aria-hidden />} onClick={() => setSelected(null)}>Tilbake</Button>
            <div className="flex flex-col gap-2 mt-14 mx-2">
                {productAreaItems.map((d, idx) => d.stories.length || d.dataproducts.length ? (
                    <>
                        {idx != 0 && <Divider />}
                        <a
                            href="#"
                            onClick={() => { setCurrentItem(idx); setOpen(false) }}
                            key={idx}
                            className={`${idx == 0 ? "px-2" : "px-8"} flex h-10 w-full items-center justify-between`}
                        >
                            <Heading level="2" size="medium" className="shrink">{d.name}</Heading>
                            
                        </a>
                    </>
                ) : (
                    <>
                        {idx != 0 && <Divider />}
                        <div className={`${idx == 0 ? "px-2" : "px-8"} flex h-10 w-full items-center justify-between`}>
                            <Heading level="2" size="medium" className="shrink font-normal">{d.name}</Heading>
                        </div>
                    </>
                )
                )}
            </div>
        </div>}
    </Modal>
}

export default ProductAreaMobileMenu