import { ReactNode } from 'react';
declare const getChildrenToArray: ({ children, filterLevel, }: {
    children: ReactNode;
    filterLevel: "List" | "ListItem";
}) => ReadonlyArray<any>;
export default getChildrenToArray;
