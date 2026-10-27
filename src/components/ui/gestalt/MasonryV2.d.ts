import { ReactNode } from 'react';
import { Cache } from './Masonry/Cache';
import { ColumnSpanConfig, ModulePositioningConfig, ResponsiveModuleConfig } from './Masonry/multiColumnLayout';
import { Align, Layout, Position } from './Masonry/types';
type Props<T> = {
    /**
     * Controls the horizontal alignment of items within the Masonry grid. The `align` property determines how items are aligned along the main-axis (horizontally) across multiple columns.
     * `start`: Aligns items to the start of the Masonry container. This is the default behavior where items are placed starting from the left side of the container.
     * `center`: Centers items in the Masonry grid. This will adjust the spacing on either side of the grid to ensure that the items are centered within the container.
     * `end`: Aligns items to the end of the Masonry container. Items will be placed starting from the right, moving leftwards, which may leave space on the left side of the container.
     * Using the `align` property can help control the visual balance and alignment of the grid, especially in responsive layouts or when dealing with varying item widths.
     *
     * _Note that layout='basic' must be set for align to take effect._
     */
    align?: Align;
    /**
     * The preferred/target item width in pixels. If `layout="flexible"` is set, the item width will
     * grow to fill column space, and shrink to fit if below the minimum number of columns.
     */
    columnWidth?: number;
    /**
     * The amount of vertical and horizontal space between each item, specified in pixels.
     */
    gutterWidth?: number;
    /**
     * An array of items to display that contains the data to be rendered by `renderItem`.
     */
    items: ReadonlyArray<T>;
    /**
     * `basic`: Left-aligned, fixed-column-width masonry layout.
     * `basicCentered`: Center-aligned, fixed-column-width masonry layout.
     * `flexible`: Item width grows to fill column space and shrinks to fit if below the minimum number of columns.
     * `serverRenderedFlexible`: Item width grows to fill column space and shrinks to fit if below the minimum number of columns. Main differerence with `flexible` is that we do not store the initial measurement. More context in [#2084](https://github.com/pinterest/gestalt/pull/2084)
     * `uniformRow`: Items are laid out in a single row, with all items having the same height. Note that Masonry does _not_ crop or alter items in any way — rows will take the height of the tallest item in the row, with additional whitespace shown below any shorter items.
     */
    layout?: Layout;
    /**
     * A callback fired when the user scrolls past a given threshold, based on the height of the container. The callback should update the state of the items, which must be reflected in the `items` prop.
     *
     * _Note that `scrollContainer` must be specified._
     */
    loadItems?: (arg1?: {
        from: number;
    } | null | undefined) => void;
    /**
     * Masonry internally caches item heights using a measurement store. If `measurementStore` is provided, Masonry will use it as its cache and will keep it updated with future measurements. This is often used to prevent re-measurement when users navigate away from and back to a grid. Create a new measurement store with `Masonry.createMeasurementStore()`.
     */
    measurementStore?: Cache<T, number>;
    /**
     * Minimum number of columns to display, regardless of the container width.
     */
    minCols?: number;
    /**
     * Masonry internally caches positions using a position store. If `positionStore` is provided, Masonry will use it as its cache and will keep it updated with future positions.
     */
    positionStore?: Cache<T, Position>;
    /**
     * A function that renders the item you would like displayed in the grid. This function is passed three props: the item's data, the item's index in the grid, and a flag indicating if Masonry is currently measuring the item.
     *
     * If present, `heightAdjustment` indicates the number of pixels this item needs to grow/shrink to accommodate a 2-column item in the grid. Items must respond to this prop by adjusting their height or layout issues will occur.
     */
    renderItem: (arg1: {
        readonly data: T;
        readonly itemIdx: number;
        readonly isMeasuring: boolean;
    }) => ReactNode;
    /**
     * A function that returns a DOM node that Masonry uses for scroll event subscription. This DOM node is intended to be the most immediate ancestor of Masonry in the DOM that will have a scroll bar; in most cases this will be the `window` itself, although sometimes Masonry is used inside containers that have `overflow: auto`. `scrollContainer` is optional, although it is required for features such as `virtualize` and `loadItems`.
     *
     * This is required if the grid is expected to be scrollable.
     */
    scrollContainer?: () => HTMLElement | Window;
    /**
     * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsBottom` allows customization of the buffer size below the viewport, specified in pixels.
     */
    virtualBoundsBottom?: number;
    /**
     * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsTop` allows customization of the buffer size above the viewport, specified in pixels.
     */
    virtualBoundsTop?: number;
    /**
     * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBufferFactor` allows customization of the buffer size, specified as a multiplier of the container height. It specifies the amount of extra buffer space for populating visible items. For example, if `virtualBufferFactor` is 2, then Masonry will render items that fit in the viewport, plus 2x the viewport height.
     */
    virtualBufferFactor?: number;
    /**
     * Specifies whether or not Masonry dynamically adds/removes content from the grid based on the user's viewport and scroll position. Note that `scrollContainer` must be specified when virtualization is used.
     */
    virtualize?: boolean;
    /**
     * Experimental prop to log the additional whitespace shown above multicolumn items and the number of iterations it took to position it.
     *
     * This is an experimental prop and may be removed in the future.
     */
    _logTwoColWhitespace?: (additionalWhitespace: ReadonlyArray<number>, numberOfIterations: number, columnSpan: number) => void;
    /**
     * Experimental prop to measure all items in one batch
     */
    _measureAll?: boolean;
    /**
     * Experimental prop to trigger rendering updates via requestAnimationFrame
     */
    _useRAF?: boolean;
    /**
     * Experimental prop to define how many columns a module should span. This is also used to enable multi-column support
     * _getColumnSpanConfig is a function that takes an individual grid item as an input and returns a ColumnSpanConfig. ColumnSpanConfig can be one of two things:
     * - A number, which indicates a static number of columns the item should span
     * - An object, which allows for configuration of the item's column span across the following grid sizes: sm (2 columns), md (3-4 columns), lg (5-8 columns), xl (9+ columns)
     *
     * This is an experimental prop and may be removed or changed in the future.
     */
    _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
    /**
     * Experimental prop to define the minimum and maximum limit a flexible width module could span.
     * This used to enable multi-column flexible width support ONLY ON SECOND ITEM OF THE ARRAY OF ITEMS.
     * Also, for the flexible width to work, the _getColumnSpanConfig prop should be set.
     * _getResponsiveModuleConfigForSecondItem is a function that takes an individual grid item as an input and returns a ResponsiveModuleConfig.
     * ResponsiveModuleConfig can be one of the following:
     * - A number, which indicates a static number of columns the item should span
     * - An object, which sets the minimum and maximum limits a multi-column item could span filling the empty columns in the first row of the grid (flexible width).
     * - Undefined, which is used to indicate that this prop isn't set.
     *
     * This is an experimental prop and may be removed or changed in the future.
     */
    _getResponsiveModuleConfigForSecondItem?: (item: T) => ResponsiveModuleConfig;
    /**
     * Experimental flag to enable dynamic heights on items. This only works if multi column items are enabled.
     */
    _dynamicHeights?: boolean;
    /**
     * Experimental flag to enable an experiment to use a revamped version of dynamic heights (This needs _dynamicHeights enabled)
     */
    _dynamicHeightsV2Experiment?: boolean;
    /**
     * Experimental prop to enable dynamic batch sizing and early bailout when positioning a module
     * - Early bailout: How much whitespace is "good enough"
     * - Dynamic batch sizing: How many items it can use. If this prop isn't used, it uses 5
     * This is an experimental prop and may be removed or changed in the future
     */
    _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
    /**
     * Experimental flag to enable new multi column position layout algorithm
     */
    _multiColPositionAlgoV2?: boolean;
};
type MasonryRef = {
    readonly handleResize: () => void;
    readonly reflow: () => void;
    readonly state: {
        width: number | null | undefined;
    };
};
declare const MasonryWithForwardRef: import("react").ForwardRefExoticComponent<Props<any> & import("react").RefAttributes<MasonryRef>>;
export default MasonryWithForwardRef;
