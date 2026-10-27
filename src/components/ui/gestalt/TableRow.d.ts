import { ReactNode } from 'react';
type Props = {
    /**
     * Must be instances of Table.Cell, Table.HeaderCell, or Table.SortableHeaderCell components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
     */
    children: ReactNode;
    /**
     * Sets the background color on hover over the row. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
     */
    hoverStyle?: 'gray' | 'none';
    /**
     * Indicates if Table.Row is currently selected or unselected. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
     */
    selected?: 'selected' | 'unselected';
};
/**
 * Use [Table.Row](https://gestalt.pinterest.systems/web/table#Table.Row) to define a row in Table.
 */
declare function TableRow({ children, hoverStyle, selected }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace TableRow {
    var displayName: string;
}
export default TableRow;
