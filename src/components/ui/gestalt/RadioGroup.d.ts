import { ReactNode } from 'react';
type Props = {
    /**
     * A collection of RadioGroup.RadioButtons representing the available options, as well as any Labels or layout components (Box, Flex, etc.), if needed. Other components such as Checkboxes should not be included. Note that children can be grouped into organizational components if desired.
     *
     */
    children: ReactNode;
    /**
     * A unique identifier for this RadioGroup.
     *
     */
    id: string;
    /**
     * The description of the radio group that tells users what is being asked of them.
     *
     */
    legend: string;
    /**
     * Determines the layout of the group. See the [direction](https://gestalt.pinterest.systems/web/radiogroup#Direction) variant to learn more.
     *
     */
    direction?: 'column' | 'row';
    /**
     * Adds an error message below the group of radio buttons. See the [error](https://gestalt.pinterest.systems/web/radiogroup#With-an-error) variant to learn more.
     *
     */
    errorMessage?: string;
    /**
     * Whether the legend should be visible or not. If hidden, the legend is still available for screen reader users, but does not appear visually. See the [legend visibility](https://gestalt.pinterest.systems/web/radiogroup#Legend-visibility) variant to learn more.
     *
     */
    legendDisplay?: 'visible' | 'hidden';
    /**
     * Adds an help message below the group of radio buttons.
     *
     */
    helperText?: string;
};
/**
 *  [RadioGroups](https://gestalt.pinterest.systems/web/radiogroup) are used for selecting only 1 item from a list of 2 or more items. If you need multiple selection or have only one option, use [Checkbox](https://gestalt.pinterest.systems/web/checkbox). If you need to provide a binary on/off choice that takes effect immediately, use [Switch](https://gestalt.pinterest.systems/web/switch).
 *
 */
declare function RadioGroup({ children, direction, errorMessage, id, legend, legendDisplay, helperText, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace RadioGroup {
    var displayName: string;
    var RadioButton: import("react").ForwardRefExoticComponent<Omit<{
        badge?: {
            text: string;
            type?: "info" | "error" | "warning" | "success" | "neutral" | "recommendation" | "darkWash" | "lightWash";
        };
        checked?: boolean;
        disabled?: boolean;
        id: string;
        image?: ReactNode;
        label?: string;
        name?: string;
        onChange: (arg1: {
            event: React.ChangeEvent<HTMLInputElement>;
            checked: boolean;
        }) => void;
        ref?: HTMLInputElement;
        size?: "sm" | "md";
        helperText?: string;
        value: string;
    }, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
}
export default RadioGroup;
