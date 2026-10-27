import { Indexable } from './zIndex';
type DataVisualizationColors = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | 'neutral';
export type TileChangeHandler = (arg1: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    selected: boolean;
    id?: string;
}) => void;
export type OnRemoveHandler = (arg1: {
    event: React.MouseEvent<HTMLButtonElement>;
    id?: string;
}) => void;
type TooltipProps = {
    accessibilityLabel?: string;
    inline?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string | ReadonlyArray<string>;
    zIndex?: Indexable;
};
export type Props = {
    /**
     * If your app uses [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider), a default value for this label will be used. Using this prop will override the default label value with a more specific label if desired. This populates the `aria-label` on the remove icon.
     */
    accessibilityRemoveIconLabel?: string;
    /**
     * The default color for TagData shown in an unselected state.
     */
    baseColor?: 'primary' | 'secondary';
    /**
     * A color code from the [data visualization palette](https://gestalt.pinterest.systems/foundations/data_visualization/color/palette) that appears when the TagData is selected.
     */
    color?: DataVisualizationColors;
    /**
     * Indicates if TagData should be disabled. Disabled TagDatas are inactive and cannot be interacted with. See the [disabled variant](https://gestalt.pinterest.systems/web/tagdata#disabled) to learn more.
     */
    disabled?: boolean;
    /**
     * An identifier to be passed back in the `onTap` callback. It can be helpful to distinguish multiple TagDatas.
     */
    id?: string;
    /**
     * Handler if the item selection state was changed with a click or a keyboard press.
     */
    onTap?: TileChangeHandler;
    /**
     * TagData can be dismissable by the "X" affordance, which triggers the `onRemove` callback. This handler should take care of state updates to no longer render the TagData.
     */
    onRemove?: OnRemoveHandler;
    /**
     * Controls whether the TagData is selected or not. Use it alongside the `onTap` handler.
     */
    selected?: boolean;
    /**
     * Defines the height of the TagData to render. See the [size variant](https://gestalt.pinterest.systems.com/web/tagdata#size) to learn more.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Shows a visible checkbox when Tagdata is in a selected state. See the [group variant](https://gestalt.pinterest.systems/web/tagdata#Group) to learn more.
     */
    showCheckbox?: boolean;
    /**
     * Short text to render inside TagData.
     */
    text: string;
    /**
     * Adds a tooltip on hover/focus of TagData. See the [with tooltip variant](https://gestalt.pinterest.systems/web/tagdata#tooltip) to learn more.
     */
    tooltip?: TooltipProps;
};
/**
 * [TagData](https://gestalt.pinterest.systems/web/tagdata)  enables users to select multiple categories to compare with each other in a graph or chart. It contains a label and can be used as a filter for different sources.
 *
 * ![TagData light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/tagdata.spec.ts-snapshots/tagdata-chromium-darwin.png)
 * ![TagData dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/tagdata-dark.spec.ts-snapshots/tagdata-dark-chromium-darwin.png)
 */
declare function TagData({ accessibilityRemoveIconLabel, baseColor, color, disabled, id, onTap, onRemove, selected, showCheckbox, size, text, tooltip, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace TagData {
    var displayName: string;
}
export default TagData;
