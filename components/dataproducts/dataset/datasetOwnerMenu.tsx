import { EllipsisCircleH } from "@navikt/ds-icons"
import { Button } from "@navikt/ds-react"
import { Divider, Dropdown, DropdownContext } from "@navikt/ds-react-internal"
import { useState } from "react"
import styled from "styled-components"

const MenuButton = styled(Button)`
    min-width: unset;
    padding: 0;
    border-radius: 50%;
`

const DatasetOwnerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    const handleMenuButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
        setIsOpen(!isOpen)
    }



    return (<DropdownContext.Provider value={{isOpen, setIsOpen, anchorEl, setAnchorEl}}>
        <MenuButton variant='tertiary' onClick={handleMenuButtonClick}><EllipsisCircleH /></MenuButton>
        <Dropdown.Menu>
            <Dropdown.Menu.GroupedList>
                <Dropdown.Menu.GroupedList.Item>Tilganger</Dropdown.Menu.GroupedList.Item>
            </Dropdown.Menu.GroupedList>
            <Divider />
            <Dropdown.Menu.GroupedList>
                <Dropdown.Menu.GroupedList.Item>Endre datasett</Dropdown.Menu.GroupedList.Item>
                <Dropdown.Menu.GroupedList.Item>Slett datasett</Dropdown.Menu.GroupedList.Item>
            </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
    </DropdownContext.Provider>)
}

export default DatasetOwnerMenu;