import { ReactNode } from 'react';
import { Props as EllipsisProps } from './ItemsEllipsis';
import { ReactChildArray } from '../utils/flattenChildren';
export declare const ALLOWED_CHILDREN_MAP: {
    readonly main: readonly ["SideNavigation.Section", "SideNavigation.TopItem", "SideNavigation.Group"];
    readonly nested: readonly ["SideNavigation.NestedItem", "SideNavigation.NestedGroup"];
};
export declare function validateChildren({ children, filterLevel, }: {
    children: ReactChildArray;
    filterLevel: 'main' | 'nested';
}): void;
export declare function countItemsWithIcon(children: ReactChildArray): number;
export declare function getChildrenActiveProp(children: ReactChildArray): EllipsisProps['active'];
/**
 * Reduces `TopItem` and `Group` items into ellipsis if they have no icons.
 * This is for items that are not inside `Section`.
 * If there are `TopItem` or `Group` items before and after `Section`s,
 * each portion will have separate ellipses for iconless items.
 * Ellipses are added as props object, not a component, during the process,
 * so it is easier to update.
 */
export declare function reduceIconlessChildrenIntoEllipsis(children: ReactChildArray): ReadonlyArray<ReactNode>;
