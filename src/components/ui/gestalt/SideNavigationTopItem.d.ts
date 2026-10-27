import { ReactElement } from 'react';
import icons from './icons/index';
import { Indexable } from './zIndex';
export type Props = {
    /**
     * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
     */
    active?: 'page' | 'section';
    /**
     * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
     */
    badge?: {
        text: string;
        type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
    };
    /**
     * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
     */
    counter?: {
        number: string;
        accessibilityLabel: string;
    };
    /**
     * Indicates if row item is disabled and therefore inactive and non-interactive. See [disabled variant](https://gestalt.pinterest.systems/web/sidenavigation#Disabled) to learn more.
     */
    disabled?: boolean;
    /**
     * Directs users to the url when item is selected.
     */
    href: string;
    /**
     * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
     */
    icon?: keyof typeof icons | {
        __path: string;
    };
    /**
     *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
     */
    notificationAccessibilityLabel?: string;
    /**
     * Callback when the user selects an item using the mouse or keyboard.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    /**
     * Provides optional additional information about a row item. See [subtext variant](https://gestalt.pinterest.systems/web/sidenavigation#Subtext) to learn more.
     */
    subtext?: string;
    /**
     * Label for the item.
     */
    label: string;
    /**
     * The primary action for each item. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
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
    /**
     * Ref that is forwarded to the underlying `li` element.
     */
    ref?: HTMLLIElement;
};
/**
 * Use [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to redirect the user to a different page or section. SideNavigation.TopItem must be used at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
declare const SideNavigationTopItemWithForwardRef: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLLIElement>>;
export default SideNavigationTopItemWithForwardRef;
