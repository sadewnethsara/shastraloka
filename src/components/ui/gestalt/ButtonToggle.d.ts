import { SkinColor } from './ButtonToggle/ColorPicker';
import icons from './icons/index';
type Props = {
    /**
     * Specifies the `id` of an associated element (or elements) whose contents or visibility are controlled by ButtonToggle so that screen reader users can identify the relationship between elements. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
     */
    accessibilityControls?: string;
    /**
     * Indicates that ButtonToggle hides or exposes collapsible components and expose whether they are currently expanded or collapsed. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
     */
    accessibilityExpanded?: boolean;
    /**
     * Label for screen readers to announce ButtonToggle. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
     */
    accessibilityLabel?: string;
    /**
     * The background color of ButtonToggle.
     *
     * This prop also accepts an array of 4 skin tones (`skinTone1`, `skinTone2`, ..., `skinTone16`) to create a color picker. See the [Color Picker Variant](https://gestalt.pinterest.systems/web/buttontoggle#Color-Picker) for details on proper usage.
     */
    color?: 'red' | 'transparent' | readonly [SkinColor, SkinColor, SkinColor, SkinColor];
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/afut/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Indicates if ButtonToggle is disabled. Disabled ButtonToggles are inactive and cannot be interacted with. See the [state variant](https://gestalt.pinterest.systems/web/buttontoggle#State) for details on proper usage.
     */
    disabled?: boolean;
    /**
     * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/buttontoggle#ARIA-attributes) for details on proper usage.
     */
    hasDropdown?: boolean;
    /**
     * An icon displayed above the text to illustrate the meaning of the option selected by the ButtonToggle.
     */
    graphicSrc?: string;
    /**
     * An icon displayed before the text to help clarify the usage of ButtonToggle.
     */
    iconStart?: keyof typeof icons;
    /**
     * Callback invoked when ButtonToggle loses focus.
     */
    onBlur?: (arg1: {
        event: React.FocusEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Callback invoked when the user clicks (press and release) on ButtonToggle with the mouse or keyboard.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Callback invoked when ButtonToggle gains focus.
     */
    onFocus?: (arg1: {
        event: React.FocusEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Toggles between selected/unselected.
     */
    selected: boolean;
    /**
     * sm: 32px, md: 40px, lg: 48px
     *
     * See the [size variant](https://gestalt.pinterest.systems/web/buttontoggle#Size) variant to learn more.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Text to render inside the ButtonToggle to convey the function and purpose of the ButtonToggle.
     */
    text: string;
};
/**
 * [ButtonToggle](https://gestalt.pinterest.systems/web/buttontoggle) is a larger alternative to selection components such as [Checkbox](https://gestalt.pinterest.systems/web/checkbox), [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup), and [Switch](https://gestalt.pinterest.systems/web/switch). It enables users to choose between two states - selected or unselected.
 *
 * ![ButtonToggle light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonToggle.spec.ts-snapshots/ButtonToggle-chromium-darwin.png)
 * ![ButtonToggle dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonToggle-dark.spec.ts-snapshots/ButtonToggle-dark-chromium-darwin.png)
 *
 */
declare const ButtonToggleWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLButtonElement>>;
export default ButtonToggleWithForwardRef;
