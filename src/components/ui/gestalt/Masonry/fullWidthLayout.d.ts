import { Cache } from './Cache';
import { ColumnSpanConfig, ModulePositioningConfig, ResponsiveModuleConfig } from './multiColumnLayout';
import { Layout, Position } from './types';
declare const fullWidthLayout: <T>({ width, idealColumnWidth, gutter, minCols, layout, measurementCache, _getColumnSpanConfig, _getModulePositioningConfig, _getResponsiveModuleConfigForSecondItem, _multiColPositionAlgoV2, ...otherProps }: {
    idealColumnWidth?: number;
    gutter: number;
    minCols?: number;
    layout: Layout;
    width?: number | null | undefined;
    positionCache: Cache<T, Position>;
    measurementCache: Cache<T, number>;
    originalItems: ReadonlyArray<T>;
    _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
    _getResponsiveModuleConfigForSecondItem?: (item: T) => ResponsiveModuleConfig;
    _multiColPositionAlgoV2?: boolean;
    _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
    logWhitespace?: (additionalWhitespace: ReadonlyArray<number>, numberOfIterations: number, columnSpan: number) => void;
}) => ((items: ReadonlyArray<T>) => ReadonlyArray<Position>);
export default fullWidthLayout;
