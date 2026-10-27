import { Indexable } from './zIndex';
type TooltipProps = {
    accessibilityLabel?: string;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string;
    zIndex?: Indexable;
};
export type TypeOptions = 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
type Props = {
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Badge position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/web/badge#Positioning) variant to learn more.
     */
    position?: 'middle' | 'top';
    /**
     * Text displayed inside of the Badge. Sentence case is preferred.
     */
    text: string;
    /**
     *  Adds a [Tooltip](https://gestalt.pinterest.systems/web/tooltip) on hover/focus of the Badge. To convey the interaction, it also displays an Icon. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
     */
    tooltip?: TooltipProps;
    /**
     * Determines the style of the badge. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
     */
    type?: TypeOptions;
};
/**
 * [Badge](https://gestalt.pinterest.systems/web/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.ts-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.ts-snapshots/Badge-dark-chromium-darwin.png)
 *
 */
declare function Badge({ dataTestId, position, text, type, tooltip, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Badge {
    var displayName: string;
}
export default Badge;
