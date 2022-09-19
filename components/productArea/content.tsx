import { Tabs } from "@navikt/ds-react";
import { PAItems } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";

interface ProductAreaContentProps {
    currentItem: number
    productAreaItems: PAItems
}

const ProductAreaContent = ({ currentItem, productAreaItems }: ProductAreaContentProps) => {
    const item = productAreaItems[currentItem]
    return (
        <Tabs
            defaultValue={item.dashboardURL ? "dashboard" : "stories"}
            size="medium"
            className="w-full pt-8"
        >
            <Tabs.List>
                {item.dashboardURL && <Tabs.Tab
                    value="dashboard"
                    label="Dashbord"
                />}
                <Tabs.Tab
                    value="stories"
                    label="Fortellinger"
                />
                <Tabs.Tab
                    value="products"
                    label="Produkter"
                />
            </Tabs.List>
            {item.dashboardURL && <Tabs.Panel
                value="dashboard"
                className="h-full w-full p-8"
            >
                <iframe
                    src={item.dashboardURL}
                    width="100%"
                    height="1200"
                />
            </Tabs.Panel>}
            <Tabs.Panel
                value="stories"
                className="h-full w-full p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {item.stories && item.stories.map((s: any, idx: number) => (
                        <SearchResultLink
                            key={idx}
                            group={s.owner.group}
                            name={s.name}
                            keywords={s.keywords}
                            link={`/story/${s.id}`}
                            type="story"
                        />
                    ))}
                    {item.stories.length == 0 && "Ingen fortellinger"}
                </div>
            </Tabs.Panel>
            <Tabs.Panel
                value="products"
                className="h-full w-full p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {item.dataproducts && item.dataproducts.map((d: any, idx: number) => (
                        <SearchResultLink
                            key={idx}
                            group={d.owner.group}
                            name={d.name}
                            keywords={d.keywords}
                            link={`/dataproduct/${d.id}/${d.slug}`}
                        />
                    ))}
                    {item.dataproducts.length == 0 && "Ingen dataprodukter"}
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}

export default ProductAreaContent;
