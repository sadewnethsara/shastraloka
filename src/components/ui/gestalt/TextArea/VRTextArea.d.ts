import { ReactNode } from 'react';
import { MaxLength } from '../TextField';
type Props = {
    id: string;
    onChange: (arg1: {
        event: React.ChangeEvent<HTMLTextAreaElement>;
        value: string;
    }) => void;
    dataTestId?: string;
    disabled?: boolean;
    errorMessage?: ReactNode;
    hasError?: boolean;
    helperText?: string;
    label?: string;
    labelDisplay?: 'visible' | 'hidden';
    maxLength?: MaxLength | null | undefined;
    name?: string;
    onBlur?: (arg1: {
        event: React.FocusEvent<HTMLTextAreaElement>;
        value: string;
    }) => void;
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLTextAreaElement>;
        value: string;
    }) => void;
    onFocus?: (arg1: {
        event: React.FocusEvent<HTMLTextAreaElement>;
        value: string;
    }) => void;
    onKeyDown?: (arg1: {
        event: React.KeyboardEvent<HTMLTextAreaElement>;
        value: string;
    }) => void;
    placeholder?: string;
    readOnly?: boolean;
    rows?: number;
    value?: string;
};
declare const TextAreaWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLTextAreaElement>>;
export default TextAreaWithForwardRef;
