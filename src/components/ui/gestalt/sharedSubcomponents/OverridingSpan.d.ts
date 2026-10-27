import { ReactElement } from 'react';
type Size = '100' | '200' | '300' | '400' | '500' | '600';
export default function OverridingSpan({ textElement, isError, inverseTextColor, size, }: {
    textElement: ReactElement | string;
    isError?: boolean;
    inverseTextColor?: boolean;
    size?: Size;
}): import("react/jsx-runtime").JSX.Element;
export {};
