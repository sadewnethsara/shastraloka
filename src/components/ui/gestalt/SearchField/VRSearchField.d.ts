import { ReactNode } from 'react';
import { autoCompleteType } from '../TextField/InternalTextField';
type SizeType = 'sm' | 'md' | 'lg';
type Props = {
    id: string;
    onChange: (arg1: {
        event: React.ChangeEvent<HTMLInputElement>;
        value: string;
    }) => void;
    accessibilityLabel: string;
    accessibilityClearButtonLabel?: string;
    autoComplete?: autoCompleteType;
    dataTestId?: string;
    errorMessage?: ReactNode;
    hasError?: boolean;
    label?: string;
    labelDisplay?: 'visible' | 'hidden';
    onBlur?: (arg1: {
        event: React.FocusEvent<HTMLInputElement>;
        value: string;
    }) => void;
    onClear?: () => void;
    onFocus?: (arg1: {
        event: React.FocusEvent<HTMLInputElement>;
        value: string;
    }) => void;
    onKeyDown?: (arg1: {
        event: React.KeyboardEvent<HTMLInputElement>;
        value: string;
    }) => void;
    placeholder?: string;
    size?: SizeType;
    value?: string;
    readOnly?: boolean;
    tabIndex?: -1 | 0;
};
declare const SearchFieldWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLInputElement>>;
export default SearchFieldWithForwardRef;
