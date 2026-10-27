import { ReactNode } from 'react';
type SizeType = 'sm' | 'md' | 'lg';
type Props = {
    id: string;
    text?: ReactNode;
    size?: SizeType;
    noPadding?: boolean;
    marginTop?: boolean;
};
export default function FormErrorMessage({ id, size, text, noPadding: noStartPadding, marginTop, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
