import { ReactNode } from 'react';
type Props = {
    /**
     * Must be instances of Table.Cell. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
     */
    children: ReactNode;
    /**
     * The contents within the drawer. See the [Table.RowDrawer implementation](https://gestalt.pinterest.systems/web/table#Table.RowDrawer-implementation) to learn more.
     */
    drawerContents: ReactNode;
    /**
     * Sets the background color on hover over the row. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
     */
    hoverStyle?: 'gray' | 'none';
    /**
     * Unique id for Table.RowDrawer.
     */
    id: string;
    /**
     * Indicates if Table.RowDrawer is currently selected or unselected. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
     */
    selected?: 'selected' | 'unselected';
};
/**
 * Use [Table.RowDrawer](https://gestalt.pinterest.systems/web/table#Table.RowDrawer) to define a row drawer to display additional content.
 */
declare function TableRowDrawer({ children, drawerContents, hoverStyle, id, selected, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace TableRowDrawer {
    var displayName: string;
}
export default TableRowDrawer;
