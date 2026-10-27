import { ReactNode } from 'react';
type SizeType = 'md' | 'lg';
type Props = {
    dataTestId?: string;
    children: ReactNode;
    disabled?: boolean;
    errorMessage?: string;
    helperText?: string;
    id: string;
    label?: string;
    labelDisplay?: 'visible' | 'hidden';
    name?: string;
    onBlur?: (arg1: {
        event: React.FocusEvent<HTMLSelectElement>;
        value: string;
    }) => void;
    onChange: (arg1: {
        event: React.ChangeEvent<HTMLSelectElement>;
        value: string;
    }) => void;
    onFocus?: (arg1: {
        event: React.FocusEvent<HTMLSelectElement>;
        value: string;
    }) => void;
    placeholder?: string;
    size?: SizeType;
    value?: string | null | undefined;
};
declare const SelectListWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLSelectElement>>;
export default SelectListWithForwardRef;
