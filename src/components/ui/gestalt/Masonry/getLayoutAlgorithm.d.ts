import { Cache } from './Cache';
import { ColumnSpanConfig, ModulePositioningConfig, ResponsiveModuleConfig } from './multiColumnLayout';
import { Align, Layout, Position } from './types';
export declare function getIsFlexibleLayout({ layout, width, }: {
    layout: Layout;
    width: number | null | undefined;
}): boolean;
export default function getLayoutAlgorithm<T>({ align, columnWidth, gutter, items, layout, measurementStore, minCols, positionStore, width, _getColumnSpanConfig, _getResponsiveModuleConfigForSecondItem, _logTwoColWhitespace, _getModulePositioningConfig, _multiColPositionAlgoV2, }: {
    align: Align;
    columnWidth: number | undefined;
    gutter: number;
    items: ReadonlyArray<T>;
    layout: Layout;
    measurementStore: Cache<T, number>;
    minCols: number;
    positionStore: Cache<T, Position>;
    width: number | null | undefined;
    _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
    _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
    _getResponsiveModuleConfigForSecondItem?: (item: T) => ResponsiveModuleConfig;
    _logTwoColWhitespace?: (additionalWhitespace: ReadonlyArray<number>, numberOfIterations: number, columnSpan: number) => void;
    _multiColPositionAlgoV2?: boolean;
}): (items: ReadonlyArray<T>) => ReadonlyArray<Position>;
