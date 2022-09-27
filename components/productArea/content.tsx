import { Tabs } from "@navikt/ds-react";
import { useState } from "react";
import { PAItem, PAItems } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";

interface ProductAreaContentProps {
    currentItem: PAItem
    currentTab: string
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

const ProductAreaContent = ({ currentItem, currentTab, setCurrentTab }: ProductAreaContentProps) => {
    return (
        <Tabs
            value={currentTab}
            onChange={setCurrentTab}
            size="medium"
            className="w-full pt-8"
        >
            <Tabs.List>
                {currentItem.dashboardURL && <Tabs.Tab
                    value="dashboard"
                    label="Dashbord"
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
                className="h-full w-full p-8"
            >
                <iframe
                    src={currentItem.dashboardURL}
                    width="100%"
                    height="1200"
                />
            </Tabs.Panel>}
            <Tabs.Panel
                value="stories"
                className="h-full w-full p-8"
            >
                <div className="flex flex-col gap-2">
                    {currentItem.stories && currentItem.stories.map((s: any, idx: number) => (
                        <SearchResultLink
                            key={idx}
                            group={s.owner.group}
                            name={s.name}
                            description={s.description}
                            keywords={s.keywords}
                            link={`/story/${s.id}`}
                            type="story"
                        />
                    ))}
                    {currentItem.stories.length == 0 && "Ingen fortellinger"}
                </div>
            </Tabs.Panel>
            <Tabs.Panel
                value="products"
                className="h-full w-full p-8"
            >
                <div className="flex flex-col gap-2">
                    {currentItem.dataproducts && currentItem.dataproducts.map((d: any, idx: number) => (
                        <SearchResultLink
                            key={idx}
                            group={d.owner.group}
                            name={d.name}
                            keywords={d.keywords}
                            description={d.description}
                            link={`/dataproduct/${d.id}/${d.slug}`}
                        />
                    ))}
                    {currentItem.dataproducts.length == 0 && "Ingen dataprodukter"}
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}

export default ProductAreaContent;
