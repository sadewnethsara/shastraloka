import { ReactElement, ReactNode } from 'react';
import { autoCompleteType } from './InternalTextField';
import { MaxLength } from '../TextField';
type SizeType = 'sm' | 'md' | 'lg';
type Props = {
    id: string;
    onChange: (arg1: {
        event: React.ChangeEvent<HTMLInputElement>;
        value: string;
    }) => void;
    accessibilityControls?: string;
    accessibilityActiveDescendant?: string;
    autoComplete?: autoCompleteType;
    dataTestId?: string;
    disabled?: boolean;
    errorMessage?: ReactNode;
    hasError?: boolean;
    helperText?: string;
    iconButton?: ReactElement;
    label?: string;
    labelDisplay?: 'visible' | 'hidden';
    max?: number;
    maxLength?: MaxLength | null | undefined;
    min?: number;
    mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    mobileInputMode?: 'none' | 'text' | 'decimal' | 'numeric';
    name?: string;
    onBlur?: (arg1: {
        event: React.FocusEvent<HTMLInputElement>;
        value: string;
    }) => void;
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLInputElement>;
        value: string;
    }) => void;
    onFocus?: (arg1: {
        event: React.FocusEvent<HTMLInputElement>;
        value: string;
    }) => void;
    onKeyDown?: (arg1: {
        event: React.KeyboardEvent<HTMLInputElement>;
        value: string;
    }) => void;
    placeholder?: string;
    readOnly?: boolean;
    readOnlyNoIconButton?: boolean;
    size?: SizeType;
    step?: number;
    tags?: ReadonlyArray<ReactElement>;
    type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
    value?: string;
};
declare const InternalTextFieldWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLInputElement>>;
export default InternalTextFieldWithForwardRef;
