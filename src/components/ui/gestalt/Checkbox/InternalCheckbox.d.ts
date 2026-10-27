import { ReactElement, ReactNode } from 'react';
type Props = {
    checked?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    helperText?: string;
    id: string;
    image?: ReactNode;
    indeterminate?: boolean;
    label?: string;
    labelDisplay?: 'visible' | 'hidden';
    name?: string;
    onChange?: (arg1: {
        event: React.ChangeEvent<HTMLInputElement>;
        checked: boolean;
    }) => void;
    onClick?: (arg1: {
        event: React.ChangeEvent<HTMLInputElement>;
        checked: boolean;
    }) => void;
    /**
     * Make the checkbox readonly. Interactivity is disabled, but it can be used as a visual indicator. Click handler events are also disabled
     */
    readOnly?: boolean;
    ref?: ReactElement;
    size?: 'sm' | 'md';
    style?: {
        borderColor?: string;
        backgroundColor?: string;
    };
};
declare const InternalCheckboxWithForwardRef: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export default InternalCheckboxWithForwardRef;
