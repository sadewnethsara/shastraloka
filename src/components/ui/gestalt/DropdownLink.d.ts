import { ComponentProps, ReactNode } from 'react';
import Avatar from './Avatar';
type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
type OptionItemType = {
    label: string;
    subtext?: string;
    value: string;
};
type Props = {
    /**
     * When supplied, will display an [Avatar](https://gestalt.pinterest.systems/web/avatar) next to the item's label. See the [Avatar](https://gestalt.pinterest.systems/web/dropdown#Avatar) variant to learn more.
     */
    avatar?: Omit<ComponentProps<typeof Avatar>, 'size' | 'verified' | 'outline'> & {
        size: 'sm' | 'md';
    };
    /**
     * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/dropdown#Badges) variant to learn more.
     */
    badge?: BadgeType;
    /**
     * If needed, users can supply custom content to each Dropdown Link. This can be useful when extra functionality is needed beyond a basic Link. See the [Custom item content](https://gestalt.pinterest.systems/web/dropdown#Custom-item-content) variant to learn more.
     */
    children?: ReactNode;
    /**
     * When supplied, will add a data-test-id prop to the dom element.
     */
    dataTestId?: string;
    /**
     * Disabled items appear inactive and cannot be interacted with.
     */
    disabled?: boolean;
    /**
     * Directs users to the url when item is selected. See the [Types of items](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) variant to learn more.
     */
    href: string;
    /**
     * An icon displayed after the text to help clarify the usage of the Dropdown Link. See the [icon variant](https://gestalt.pinterest.systems/web/button#Icons) to learn more.
     */
    iconEnd?: 'visit' | 'directional-arrow-right' | 'download';
    /**
     * Callback fired when clicked (pressed and released) with a mouse or keyboard. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation. To learn more about `mobileOnDismissStart`, see the [animation variant in SheetMobile](https://gestalt.pinterest.systems/web/sheetmobile#Animation). `mobileOnDismissStart` is the equivalent of `onDismissStart` in SheetMobile.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
        mobileOnDismissStart: () => void;
    }) => void;
    /**
     * Object detailing the label, value, and optional subtext for this item.
     */
    option: OptionItemType;
    /**
     * Private prop used for accessibility purposes
     */
    _index?: number;
};
/**
 * Use [Dropdown.Link](https://gestalt.pinterest.systems/dropdownDropdown.Link) for navigation, when the Dropdown item navigates to a new page.
 */
declare function DropdownLink({ avatar, badge, children, dataTestId, disabled, href, _index, iconEnd, onClick, option, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownLink {
    var displayName: string;
}
export default DropdownLink;
