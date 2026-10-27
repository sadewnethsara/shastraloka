import { ReactNode } from 'react';
type Props = {
    children?: ReactNode;
    htmlFor: string;
    _labelDisplay?: 'visible' | 'hidden';
};
export default function InternalLabel({ children, htmlFor, _labelDisplay }: Props): import("react/jsx-runtime").JSX.Element;
export {};
