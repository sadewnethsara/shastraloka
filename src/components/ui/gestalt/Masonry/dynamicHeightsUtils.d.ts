/**
 * Util functions used to update positions when an item changes the height dynamically
 */
import { Cache } from './Cache';
import { Position } from './types';
declare function recalcHeights<T>({ items, changedItem, newHeight, positionStore, measurementStore, }: {
    items: ReadonlyArray<T>;
    changedItem: T;
    newHeight: number;
    positionStore: Cache<T, Position>;
    measurementStore: Cache<T, number>;
}): boolean;
export default recalcHeights;
