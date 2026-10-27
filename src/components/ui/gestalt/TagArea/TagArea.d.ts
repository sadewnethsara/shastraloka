import { ReactElement, ReactNode } from 'react';
import { MaxLength } from '../TextField';
type Props = {
    id: string;
    onChange: (arg1: {
        event: React.ChangeEvent<HTMLInputElement>;
        value: string;
    }) => void;
    accessibilityControls?: string;
    accessibilityActiveDescendant?: string;
    dataTestId?: string;
    disabled?: boolean;
    errorMessage?: ReactNode;
    hasError?: boolean;
    helperText?: string;
    iconButton?: ReactElement;
    label?: string;
    labelDisplay?: 'visible' | 'hidden';
    maxLength?: MaxLength | null | undefined;
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
    size: 'sm' | 'md' | 'lg';
    tags: ReadonlyArray<ReactElement>;
    value?: string;
};
declare const TagAreaWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLTextAreaElement>>;
export default TagAreaWithForwardRef;
