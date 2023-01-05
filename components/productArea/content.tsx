import { Tabs } from "@navikt/ds-react";
import { PAItem } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";
import { useProductAreasQuery, useTeamkatalogenQuery } from "../../lib/schema/graphql";

interface ProductAreaContentProps {
    currentItem: PAItem
    currentTab: string
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

const ProductAreaContent = ({ currentItem, currentTab, setCurrentTab }: ProductAreaContentProps) => {
    const tk = useTeamkatalogenQuery({
        variables: { q: '' },
    })
    const po = useProductAreasQuery()
    return (
        <Tabs
            value={currentTab}
            onChange={setCurrentTab}
            size="medium"
            className="w-full"
        >
            <Tabs.List>
                {currentItem.dashboardURL && <Tabs.Tab
                    value="dashboard"
                    label={currentItem.name}
                />}
                <Tabs.Tab
                    value="stories"
                    label={`Fortellinger (${currentItem.stories.length})`}
                />
                <Tabs.Tab
                    value="products"
                    label={`Produkter (${currentItem.dataproducts.length})`}
                />
            </Tabs.List>
            {currentItem.dashboardURL && <Tabs.Panel
                value="dashboard"
                className="h-full w-full py-4"
            >
                <iframe
                    src={currentItem.dashboardURL}
                    width="100%"
                    height="1200"
                />
            </Tabs.Panel>}
            <Tabs.Panel
                value="stories"
                className="h-full w-full py-4"
            >
                <div className="flex flex-col gap-2">
                    {currentItem.stories && currentItem.stories.map((s: any, idx: number) => (
                        <SearchResultLink
                            key={idx}
                            group={s.owner}
                            name={s.name}
                            description={s.excerpt}
                            keywords={s.keywords}
                            link={`/story/${s.id}`}
                            type="story"
                            teamkatalogen={tk.data}
                            productAreas={po.data}
                        />
                    ))}
                    {currentItem.stories.length == 0 && "Ingen fortellinger"}
                </div>
            </Tabs.Panel>
            <Tabs.Panel
                value="products"
                className="h-full w-full py-4"
            >
                <div className="flex flex-col gap-2">
                    {currentItem.dataproducts && currentItem.dataproducts.map((d: any, idx: number) => (
                        <SearchResultLink
                            key={idx}
                            group={d.owner}
                            name={d.name}
                            keywords={d.keywords}
                            description={d.description}
                            link={`/dataproduct/${d.id}/${d.slug}`}
                            teamkatalogen={tk.data}
                            productAreas={po.data}
                        />
                    ))}
                    {currentItem.dataproducts.length == 0 && "Ingen dataprodukter"}
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}

export default ProductAreaContent;
