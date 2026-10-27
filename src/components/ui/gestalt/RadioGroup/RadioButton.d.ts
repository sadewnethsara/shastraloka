import { ReactNode } from 'react';
type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
type Props = {
    badge?: BadgeType;
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
    size?: 'sm' | 'md';
    helperText?: string;
    value: string;
};
declare const RadioGroupButtonWithForwardRef: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export default RadioGroupButtonWithForwardRef;
