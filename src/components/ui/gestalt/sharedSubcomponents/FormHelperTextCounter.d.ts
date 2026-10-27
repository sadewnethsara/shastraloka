import { MaxLength } from '../TextField';
type Props = {
    maxLength: MaxLength;
    currentLength?: number;
    disabled?: boolean;
};
export default function FormHelperTextCounter({ disabled, currentLength, maxLength }: Props): import("react/jsx-runtime").JSX.Element;
export {};
