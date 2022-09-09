import { Tabs } from "@navikt/ds-react";
import { Story, Dataproduct } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";

interface ProductAreaContentProps {
    dataproducts: Array<Dataproduct> | undefined
    stories: Array<Story> | undefined
}

const ProductAreaContent = ({ dataproducts, stories }: ProductAreaContentProps) => {
    return (
        <Tabs
            defaultValue="dashboard"
            size="medium"
            className="w-full pt-8"
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
                className="h-full w-full bg-[#F1F4F1] p-8"
            >
                <iframe
                    src="https://metabase.dev.intern.nav.no/public/dashboard/fd4fc319-7ac3-4eca-9957-b1751da590f9"
                    width="100%"
                    height="1200"
                />
            </Tabs.Panel>
            <Tabs.Panel
                value="stories"
                className="h-full w-full bg-[#F1F4F1] p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {stories && stories.map((s, idx) => (
                        <SearchResultLink
                            key={idx}
                            group={s.owner.group}
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
                className="h-full w-full bg-[#F1F4F1] p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {dataproducts && dataproducts.map((d, idx) => (
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
