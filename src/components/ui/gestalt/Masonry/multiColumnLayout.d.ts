import { Cache } from './Cache';
import { Position } from './types';
export declare const MULTI_COL_ITEMS_MEASURE_BATCH_SIZE = 5;
type GridSizeConfig = {
    'sm': number;
    'md': number;
    '_lg1'?: number;
    'lg': number;
    'xl': number;
};
type GridSize = keyof GridSizeConfig;
export type ColumnSpanConfig = number | GridSizeConfig;
export type ModulePositioningConfig = {
    itemsBatchSize: number;
    whitespaceThreshold?: number;
    iterationsLimit?: number;
};
export type ResponsiveModuleConfig = number | {
    'min': number;
    'max': number;
} | undefined;
export declare function columnCountToGridSize(columnCount: number): GridSize;
export declare function getColumnSpanFromGridSize(columnSpanConfig: ColumnSpanConfig, gridSize: GridSize): number;
export declare function calculateActualColumnSpan<T>(props: {
    columnCount: number;
    firstItem: T;
    isFlexibleWidthItem: boolean;
    item: T;
    responsiveModuleConfigForSecondItem: ResponsiveModuleConfig;
    _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
}): number;
export declare function initializeHeightsArray<T>({ centerOffset, checkIsFlexibleWidthItem, columnCount, columnWidthAndGutter, firstItem, gutter, items, positionCache, responsiveModuleConfigForSecondItem, _getColumnSpanConfig, }: {
    centerOffset: number;
    checkIsFlexibleWidthItem: (item: T) => boolean;
    columnCount: number;
    columnWidthAndGutter: number;
    firstItem: T;
    gutter: number;
    items: ReadonlyArray<T>;
    positionCache: Cache<T, Position> | null | undefined;
    responsiveModuleConfigForSecondItem: ResponsiveModuleConfig;
    _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
}): ReadonlyArray<number>;
declare const multiColumnLayout: <T>({ items, gutter, columnWidth, columnCount, centerOffset, logWhitespace, measurementCache, positionCache, originalItems, _getColumnSpanConfig, _getModulePositioningConfig, _getResponsiveModuleConfigForSecondItem, _multiColPositionAlgoV2, }: {
    items: ReadonlyArray<T>;
    gutter?: number;
    columnWidth?: number;
    columnCount?: number;
    centerOffset?: number;
    positionCache: Cache<T, Position>;
    measurementCache: Cache<T, number>;
    logWhitespace?: (additionalWhitespace: ReadonlyArray<number>, numberOfIterations: number, columnSpan: number) => void;
    originalItems: ReadonlyArray<T>;
    _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
    _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
    _getResponsiveModuleConfigForSecondItem: (item: T) => ResponsiveModuleConfig;
    _multiColPositionAlgoV2?: boolean;
}) => ReadonlyArray<Position>;
export default multiColumnLayout;
