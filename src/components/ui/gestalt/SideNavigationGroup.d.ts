import { ReactElement, ReactNode } from 'react';
import icons from './icons/index';
import { Indexable } from './zIndex';
type IconType = keyof typeof icons | {
    __path: string;
};
type Display = 'expandable' | 'static';
type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
};
type Counter = {
    number: string;
    accessibilityLabel: string;
};
export type Props = {
    /**
     * When set to 'page' or 'section', it displays the item in "active" state. Available only when `href` prop is present. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
     */
    active?: 'page' | 'section';
    /**
     * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
     */
    badge?: BadgeType;
    /**
     * Content of the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
     */
    children: ReactNode;
    /**
     * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
     */
    counter?: Counter;
    /**
     * Nested directories can be static or expandable.  See the [group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
     */
    display?: Display;
    /**
     * When passed SideNavigation.Group becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more. This functionality is not supported in mobile.
     */
    expanded?: boolean;
    /**
     * Directs users to the url when item is selected. Available only for Desktop.
     */
    href?: string;
    /**
     * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
     */
    icon?: IconType;
    /**
     * Label for the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
     */
    label: string;
    /**
     *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
     */
    notificationAccessibilityLabel?: string;
    /**
     * Callback when the user selects an item using the mouse or keyboard. Available only when `href` prop is present.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    /**
     * Callback fired when the expand button component is clicked and the component is controlled.This functionality is not supported in mobile.
     */
    onExpand?: (arg1: {
        expanded: boolean;
    }) => void;
    /**
     * The primary action for each group. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
     */
    primaryAction?: {
        icon?: 'ellipsis' | 'edit' | 'trash-can';
        onClick?: (arg1: {
            event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
        }) => void;
        tooltip: {
            accessibilityLabel?: string;
            text: string;
            zIndex?: Indexable;
        };
        dropdownItems?: ReadonlyArray<ReactElement>;
    };
};
/**
 * Use [SideNavigation.Group](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group) to hold SideNavigation.NestedItem and SideNavigation.NestedGroup at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
declare function SideNavigationGroup({ active, badge, children, counter, display, expanded: expandedProp, icon, notificationAccessibilityLabel, label, onClick, onExpand, primaryAction, href, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace SideNavigationGroup {
    var displayName: string;
}
export default SideNavigationGroup;
