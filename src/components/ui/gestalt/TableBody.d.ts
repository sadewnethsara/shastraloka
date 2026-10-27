import { ReactNode } from 'react';
type Props = {
    /**
     * Must be instances of Table.Row and/or Table.RowExpandable components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
     */
    children: ReactNode;
};
/**
 * Use [Table.Body](https://gestalt.pinterest.systems/web/table#Table.Body) to group the body content in Table.
 */
declare function TableBody({ children }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace TableBody {
    var displayName: string;
}
export default TableBody;
