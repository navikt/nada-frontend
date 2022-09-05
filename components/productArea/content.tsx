import { Tabs } from "@navikt/ds-react";
import { Dataproduct, Story } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";

interface ProductAreaContentProps {
    dataproducts: Array<Dataproduct>
    stories: Array<Story>
}

const ProductAreaContent = ({ dataproducts, stories }: ProductAreaContentProps) => {
    return (
        <Tabs
            defaultValue="dashboard"
            size="medium"
            className="w-full"
        >
            <Tabs.List>
                <Tabs.Tab
                    value="dashboard"
                    label="Dashboard"
                />
                <Tabs.Tab
                    value="stories"
                    label="Fortellinger"
                />
                <Tabs.Tab
                    value="products"
                    label="Produkter"
                />
            </Tabs.List>
            <Tabs.Panel
                value="dashboard"
                className="h-24 w-full bg-gray-50 p-8"
            >
                <iframe
                    src="https://metabase.dev.intern.nav.no/public/dashboard/fd4fc319-7ac3-4eca-9957-b1751da590f9"
                    width="100%"
                    height="1200"
                />
            </Tabs.Panel>
            <Tabs.Panel
                value="stories"
                className="h-24  w-full bg-gray-50 p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {stories.map((s, idx) => (
                        <SearchResultLink
                            key={idx}
                            group={s.group!.group}
                            name={s.name}
                            keywords={s.keywords}
                            link={`/story/${s.id}`}
                            type="story"
                        />
                    ))}
                </div>
            </Tabs.Panel>
            <Tabs.Panel
                value="products"
                className="h-24 w-full bg-gray-50 p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {dataproducts.map((d, idx) => (
                        <SearchResultLink
                            key={idx}
                            group={d.owner.group}
                            name={d.name}
                            keywords={d.keywords}
                            link={`/dataproduct/${d.id}/${d.slug}`}
                        />
                    ))}
                </div>
            </Tabs.Panel>
        </Tabs>
    )
}

export default ProductAreaContent;
