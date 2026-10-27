import { ReactNode } from 'react';
type Props = {
    /**
     * Label for the item.
     */
    label: string;
    /**
     * Directs users to the url when item is selected.
     */
    href: string;
    /**
     * When set to `true`, it displays the item in "active" state.
     */
    active: boolean;
    /**
     * Callback when the user selects an item using the mouse or keyboard.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    /**
     * Must be instances TableofContents.Item
     */
    children?: ReactNode;
};
/**
 * [TableOfContents.Item](https://gestalt.pinterest.systems/web/tableofcontents#TableOfContents.Item) is a subcomponent of [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents). Use [TableOfContents.Item](https://gestalt.pinterest.systems/web/tableofcontents#TableOfContents.Item) to redirect the user to a different section of a page.
 */
declare function TableOfContentsItem(props: Props): import("react/jsx-runtime").JSX.Element;
declare namespace TableOfContentsItem {
    var displayName: string;
}
export default TableOfContentsItem;
