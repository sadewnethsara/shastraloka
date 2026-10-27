import { ReactNode } from 'react';
type SizeType = 'sm' | 'md' | 'lg';
type OnChange = (arg1: {
    event: React.MouseEvent<HTMLButtonElement>;
    activeIndex: number;
}) => void;
type Props = {
    /**
     * Items for selection. Though typically strings, React.Node is accepted to allow for Icons or other custom UI.
     */
    items: ReadonlyArray<ReactNode>;
    /**
     * Callback triggered when the user selects an item.
     */
    onChange: OnChange;
    /**
     * By default, items have equal widths. If this prop is true, the width of an item is based on its content. See the [responsive example](https://gestalt.pinterest.systems/web/segmentedcontrol#Example:-Responsive) for more details.
     */
    responsive?: boolean;
    /**
     * Index of element in `items` that is currently selected.
     */
    selectedItemIndex: number;
    /**
     * Size of the Segmented Control.
     */
    size?: SizeType;
};
/**
 * [SegmentedControl](https://gestalt.pinterest.systems/web/segmentedcontrol)  may be used to group multiple selections. The controls display the current state and related state.
 *
 * Create layout to convey clear sense of information hierarchy. When a control is engaged, information below the control should also be updated.
 *
 * ![SegmentedControl light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl.spec.ts-snapshots/SegmentedControl-chromium-darwin.png)
 * ![SegmentedControl dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl-dark.spec.ts-snapshots/SegmentedControl-dark-chromium-darwin.png)
 *
 */
declare function SegmentedControl({ items, onChange, responsive, selectedItemIndex, size, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace SegmentedControl {
    var displayName: string;
}
export default SegmentedControl;
