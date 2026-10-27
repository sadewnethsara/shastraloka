import { ReactNode } from 'react';
type TableContextType = {
    stickyColumns: number | null | undefined;
};
type Props = {
    children: ReactNode;
    stickyColumns: number | null | undefined;
};
declare function TableContextProvider({ children, stickyColumns }: Props): import("react/jsx-runtime").JSX.Element;
declare function useTableContext(): TableContextType;
export { TableContextProvider, useTableContext };
