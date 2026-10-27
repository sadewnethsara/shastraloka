import { ReactNode } from 'react';
import { ReactChildArray } from '../utils/flattenChildren';
/** @deprecated */
declare const getChildrenToArray: ({ children, filterLevel, }: {
    children: ReactNode;
    filterLevel: "main" | "nested";
}) => ReactChildArray;
export default getChildrenToArray;
