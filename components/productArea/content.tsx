import { Tabs } from "@navikt/ds-react";
import { Story, Dataproduct } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";

interface ProductAreaContentProps {
    currentDashboard: number
    dashboards: any
}

const ProductAreaContent = ({ currentDashboard, dashboards }: ProductAreaContentProps) => {
    const dashboard = dashboards[currentDashboard]
    return (
        <Tabs
            defaultValue="stories"
            size="medium"
            className="w-full pt-8"
        >
            <Tabs.List>
                {/* <Tabs.Tab
                    value="dashboard"
                    label="Dashboard"
                /> */}
                <Tabs.Tab
                    value="stories"
                    label="Fortellinger"
                />
                <Tabs.Tab
                    value="products"
                    label="Produkter"
                />
            </Tabs.List>
            {/* <Tabs.Panel
                value="dashboard"
                className="h-full w-full bg-[#F1F4F1] p-8"
            >
                <iframe
                    src="https://metabase.dev.intern.nav.no/public/dashboard/fd4fc319-7ac3-4eca-9957-b1751da590f9"
                    width="100%"
                    height="1200"
                />
            </Tabs.Panel> */}
            <Tabs.Panel
                value="stories"
                className="h-full w-full bg-[#F1F4F1] p-8"
            >
                <div className="flex flex-col gap-2 ">
                    {dashboard.stories && dashboard.stories.map((s: any, idx: number) => (
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
                    {dashboard.dataproducts && dashboard.dataproducts.map((d: any, idx: number) => (
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
