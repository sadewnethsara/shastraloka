type Props = {
    /**
     * String that clients such as VoiceOver will read to describe the element. Always localize the label.
     */
    accessibilityLabel?: string;
    /**
     * Color of the Spinner. `grayscale` and `white` variants are available only in Visual Refresh experiment.
     */
    color?: 'default' | 'subtle' | 'grayscale' | 'white';
    /**
     * Whether or not to render with a 300ms delay. The delay is for perceived performance, so you should rarely need to remove it. See the [delay variant](https://gestalt.pinterest.systems/web/spinner#Delay) for more details.
     */
    delay?: boolean;
    /**
     * Adds a label under the spinning animation.
     */
    label?: string;
    /**
     * Indicates if Spinner should be visible. Controlling the component with this prop ensures the outro animation is played. If outro animation is not intended, prefer conditional rendering.
     */
    show: boolean;
    /**
     * sm: 32px, md: 40px, lg: 56px. 'lg' is available only in Visual Refresh experiment and is the default value.
     */
    size?: 'sm' | 'md' | 'lg';
};
/**
 * [Spinner](https://gestalt.pinterest.systems/web/spinner ) helps indicate that a surface's content or portion of content is currently loading.
 *
 * ![Spinner](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/general/Spinner.svg)
 *
 */
declare function Spinner({ accessibilityLabel, color, delay, label, show, size, }: Props): import("react/jsx-runtime").JSX.Element | null;
declare namespace Spinner {
    var displayName: string;
}
export default Spinner;
