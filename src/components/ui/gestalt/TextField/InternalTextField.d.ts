import { ReactElement, ReactNode } from 'react';
import { MaxLength } from '../TextField';
type SizeType = 'sm' | 'md' | 'lg';
export type autoCompleteType = 'additional-name' | 'address-level1' | 'address-level2' | 'address-level3' | 'address-level4' | 'address-line1' | 'address-line2' | 'address-line3' | 'bday-day' | 'bday-month' | 'bday-year' | 'bday' | 'billing' | 'cc-additional-name' | 'cc-csc' | 'cc-exp-month' | 'cc-exp-year' | 'cc-exp' | 'cc-family-name' | 'cc-given-name' | 'cc-name' | 'cc-number' | 'cc-type' | 'country-name' | 'country' | 'current-password' | 'email' | 'family-name' | 'given-name' | 'honoric-prefix' | 'honoric-suffix' | 'impp' | 'language' | 'name' | 'new-password' | 'nickname' | 'off' | 'on' | 'one-time-code' | 'organization-title' | 'organization' | 'photo' | 'postal-code' | 'sex' | 'shipping' | 'street-address' | 'tel-area-code' | 'tel-country-code' | 'tel-extension' | 'tel-local-prefix' | 'tel-local-suffix' | 'tel-local' | 'tel-national' | 'tel' | 'transaction-amount' | 'transaction-currency' | 'url' | 'username' | 'webauthn';
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
    size?: SizeType;
    step?: number;
    tags?: ReadonlyArray<ReactElement>;
    type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
    value?: string;
};
declare const InternalTextFieldWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLInputElement>>;
export default InternalTextFieldWithForwardRef;
