import { Tabs } from "@navikt/ds-react";
import { PAItem } from "../../pages/productArea/[id]";
import SearchResultLink from "../search/searchResultLink";
import { Story, useProductAreasQuery, useTeamkatalogenQuery, useUserInfoDetailsQuery } from "../../lib/schema/graphql";
import { owner } from "../../lib/schema/yupValidations";
import { useContext } from "react";
import { UserState } from "../../lib/context";

interface ProductAreaContentProps {
    currentItem: PAItem
    currentTab: string
    setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

interface UnifiedStory{
        __typename?: "Story" | "QuartoStory" | undefined
        id: string
        name: string
        created: any
        keywords: string[]
        lastModified?: any
        owner?: {
            __typename?: "Owner" | undefined;
            group: string;
            teamkatalogenURL?: string;
        }
    }

const ProductAreaContent = ({ currentItem, currentTab, setCurrentTab }: ProductAreaContentProps) => {
    const tk = useTeamkatalogenQuery({
        variables: { q: '' },
    })
    var allStories = currentItem.stories.map(it=> it as UnifiedStory)
    .concat(currentItem.quartoStories.map(it=> it as UnifiedStory))
    const po = useProductAreasQuery()
    const userInfo= useContext(UserState)

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
                    label={`Fortellinger (${allStories.length})`}
                />
                <Tabs.Tab
                    value="products"
                    label={`Produkter (${currentItem.dataproducts.length})`}
                />
                <Tabs.Tab
                    value="insightProducts"
                    label={`Innsiktsprodukt (${currentItem.insightProducts.length})`}
                />                
            </Tabs.List>
            {currentItem.dashboardURL && <Tabs.Panel
                value="dashboard"
                className="h-full w-full py-4"
            >
                <iframe
                    height="4200px"
                    width="100%"
                    src={currentItem.dashboardURL}
                />
            </Tabs.Panel>}
            <Tabs.Panel
                value="stories"
                className="h-full w-full py-4"
            >
                <div className="flex flex-col gap-2">
                    {allStories && allStories.map((s: any, idx: number) => (
                        <SearchResultLink
                            resourceType="datafortelling"
                            key={idx}
                            group={s.owner}
                            name={s.name}
                            description={s.excerpt}
                            keywords={s.keywords}
                            link={`${s.__typename == 'Story'? '/story/' : '/quarto/'}${s.id}`}
                            type={s.__typename}
                            teamkatalogen={tk.data}
                            productAreas={po.data}
                        />
                    ))}
                    {allStories.length == 0 && "Ingen fortellinger"}
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
            <Tabs.Panel
                value="insightProducts"
                className="h-full w-full py-4"
            >
                <div className="flex flex-col gap-2">
                    {currentItem.insightProducts && currentItem.insightProducts.map((ip: any, idx: number) => (
                        <SearchResultLink
                            resourceType="innsiktsprodukt"
                            key={idx}
                            group={{
                                teamkatalogenURL: ip.teamkatalogenURL,
                                group: ip.group,
                            }}
                            name={ip.name}
                            keywords={ip.keywords}
                            description={ip.description}
                            link={ip.link}
                            type="insightProduct"
                            id={ip.id}
                            innsiktsproduktType={ip.type}
                            teamkatalogen={tk.data}
                            productAreas={po.data}
                            editable={!!userInfo?.googleGroups?.find(it=> it.email == ip.group)}
                        />
                    ))}
                    {currentItem.insightProducts.length == 0 && "Ingen innsiktsprodukter"}
                </div>
            </Tabs.Panel>            
        </Tabs>
    )
}

export default ProductAreaContent;
