type Props = {
    /**
     * Label for screen readers to announce Button. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
     */
    accessibilityLabel: string;
    /**
     * When supplied, will display a numeric counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more. Above three digits, the only option to display is "99+".
     */
    count?: number;
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Indicator position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/web/indicator#Positioning) variant to learn more.
     */
    position?: 'middle' | 'top';
};
/**
 * [Indicator](https://gestalt.pinterest.systems/web/indicator) displays a visual affordance that something has been updated (either with a quantitative number or not)
 *
 * ![Indicator light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Indicator.spec.ts-snapshots/Indicator-chromium-darwin.png)
 * ![Indicator dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Indicator-dark.spec.ts-snapshots/Indicator-dark-chromium-darwin.png)
 *
 */
export default function Indicator({ accessibilityLabel, count, dataTestId, position, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
