import icons from './icons/index';
import { Indexable } from './zIndex';
type Props = {
    /**
     * Label for screen readers to announce IconButtonLink.
     */
    accessibilityLabel: string;
    /**
     * When set to 'page', it displays the item in "active" state. See the [active state](https://gestalt.pinterest.systems/web/iconbuttonlink#Active-state) guidelines to learn more.
     */
    active?: 'page';
    /**
     * Primary colors to apply to the IconButtonLink background.
     */
    bgColor?: 'transparent' | 'transparentDarkGray' | 'gray' | 'lightGray' | 'white' | 'red';
    /**
     * Defines a new icon different from the built-in Gestalt icons.
     */
    dangerouslySetSvgPath?: {
        __path: string;
    };
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * When disabled, IconButtonLink looks inactive and cannot be interacted with.
     */
    disabled?: boolean;
    /**
     * Indicates whether this component is hosted in a light or dark container.
     * Used for improving focus ring color contrast.
     */
    focusColor?: 'lightBackground' | 'darkBackground';
    /**
     * Specifies a link URL.
     */
    href: string;
    /**
     * SVG icon from the Gestalt icon library to use within Icon.
     *
     * See the [icon library](http://pinch.pinadmin.com/iconLibrary) to explore available options.
     */
    icon?: keyof typeof icons;
    /**
     * Primary color to apply to the [Icon](/web/icon).
     */
    iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary';
    /**
     * Callback fired when the component is clicked, pressed or tapped. See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    /**
     * Sets a padding for the IconButtonLink.
     */
    padding?: 1 | 2 | 3 | 4 | 5;
    /**
     * Specifies the relationship between the current document and the linked document.
     */
    rel?: 'none' | 'nofollow';
    /**
     * The maximum height and width of IconButtonLink.
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Removes IconButtonLink from sequential keyboard navigation to improve accessibility.
     */
    tabIndex?: -1 | 0;
    /**
     * Define the frame or window to open the anchor defined on \`href\`.
     */
    target?: null | 'self' | 'blank';
    /**
     * Adds a [Tooltip](/web/tooltip) on hover/focus of the IconButtonLink.
     */
    tooltip?: {
        accessibilityLabel?: string;
        inline?: boolean;
        idealDirection?: 'up' | 'right' | 'down' | 'left';
        text: string;
        zIndex?: Indexable;
    };
};
/**
 * [IconButtonLink](https://gestalt.pinterest.systems/web/iconbuttonlink) is mainly used as navigational element.
 *
 * ![IconButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton.spec.ts-snapshots/IconButton-chromium-darwin.png)
 * ![IconButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/IconButton-dark.spec.ts-snapshots/IconButton-dark-chromium-darwin.png)
 *
 */
declare const IconButtonLinkWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLAnchorElement>>;
export default IconButtonLinkWithForwardRef;
