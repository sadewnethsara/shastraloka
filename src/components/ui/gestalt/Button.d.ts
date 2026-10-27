import icons from './icons/index';
type Props = {
    /**
     * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by Button so that screen reader users can identify the relationship between elements. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
     */
    accessibilityControls?: string;
    /**
     * Indicates that Button hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
     */
    accessibilityExpanded?: boolean;
    /**
     * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
     */
    accessibilityHaspopup?: boolean;
    /**
     * Label for screen readers to announce Button. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
     */
    accessibilityLabel?: string;
    /**
     * Indicates whether this component is hosted in a light or dark container.
     * Used for improving focus ring color contrast.
     */
    backgroundContext?: 'light' | 'dark';
    /**
     * The background color of Button.
     * See the [color on white backgrounds variant](https://gestalt.pinterest.systems/web/button#Color-on-white-backgrounds) and the [color on color/image backgrounds variant](https://gestalt.pinterest.systems/web/button#Color-on-colorimage-backgrounds)
     */
    color?: 'gray' | 'red' | 'blue' | 'transparent' | 'semiTransparentWhite' | 'transparentWhiteText' | 'white' | 'dark' | 'light';
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Indicates if Button is disabled. Disabled Buttons are inactive and cannot be interacted with. See the [state variant](https://gestalt.pinterest.systems/web/button#State) for details on proper usage.
     */
    disabled?: boolean;
    /**
     * Default Buttons are sized by the text within the Button whereas full-width Buttons expand to the full width of their container. See the [width variant](https://gestalt.pinterest.systems/web/button#Size) variant to learn more.
     */
    fullWidth?: boolean;
    /**
     * An icon displayed after the text to help clarify the usage of Button. See the [icon variant](https://gestalt.pinterest.systems/web/button#Icons) to learn more.
     */
    iconEnd?: keyof typeof icons;
    /**
     * An icon displayed before the text to help clarify the Button usage.
     */
    iconStart?: keyof typeof icons;
    /**
     * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See the [truncation variant](https://gestalt.pinterest.systems/web/button#Truncation) for more details.
     */
    lineClamp?: 1;
    /**
     * The name attribute specifies the name of the button element. The name attribute is used to reference form-data after the form has been submitted and for [testing](https://testing-library.com/docs/queries/about/#priority).
     */
    name?: string;
    /**
     * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more. See the [state variant](https://gestalt.pinterest.systems/web/button#State) for details on proper usage.
     */
    selected?: boolean;
    /**
     * sm: 32px, md: 40px, lg: 48px
     *
     * See the [size variant](https://gestalt.pinterest.systems/web/button#Size) variant to learn more.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Use "-1" to remove Button from keyboard navigation. See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
     */
    tabIndex?: -1 | 0;
    /**
     * Text to render inside the Button to convey the function and purpose of the Button.
     */
    text: string;
    /**
     * Use "submit" if Button is used within or associated with a form.
     */
    type?: 'button' | 'submit';
};
/**
 * [Buttons](https://gestalt.pinterest.systems/web/button) allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Popover](https://gestalt.pinterest.systems/web/popover).
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.ts-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.ts-snapshots/Button-dark-chromium-darwin.png)
 *
 */
declare const ButtonWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLButtonElement>>;
export default ButtonWithForwardRef;
