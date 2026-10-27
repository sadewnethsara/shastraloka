import { Layout } from './types';
export declare const FULL_WIDTH_LAYOUT_DEFAULT_IDEAL_COLUMN_WIDTH = 240;
export declare const FULL_WIDTH_DEFAULT_GUTTER = 0;
export declare const DEFAULT_LAYOUT_DEFAULT_COLUMN_WIDTH = 236;
export declare const DEFAULT_LAYOUT_DEFAULT_GUTTER = 14;
export default function getColumnCount({ gutter, columnWidth, width, minCols, layout, }: {
    gutter: number;
    columnWidth: number | undefined;
    width: number;
    minCols: number;
    layout: Layout;
}): number;
