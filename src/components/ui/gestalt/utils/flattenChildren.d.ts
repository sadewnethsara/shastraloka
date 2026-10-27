import { Children, ReactNode } from 'react';
export type ReactChildArray = ReturnType<typeof Children.toArray>;
export declare function flattenChildrenWithKeys(children: ReactNode, depth?: number, keys?: ReadonlyArray<string | number>): ReactChildArray;
/**
 * Do not use if the children need to be rendered.
 * Use `flattenChildrenWithKeys` to render
 * as it assigns keys to the children without keys.
 * */
export default function flattenChildren(children: ReactNode): ReactChildArray;
