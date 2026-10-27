import { Cache } from './Cache';
import { Position } from './types';
declare const uniformRowLayout: <T>({ cache, columnWidth: idealColumnWidth, flexible, gutter, width, minCols, }: {
    cache: Cache<T, number>;
    columnWidth?: number;
    flexible?: boolean;
    gutter: number;
    width?: number | null | undefined;
    minCols?: number;
}) => ((items: ReadonlyArray<T>) => ReadonlyArray<Position>);
export default uniformRowLayout;
