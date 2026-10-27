import { ReactElement } from 'react';
type Size = '100' | '200' | '300' | '400' | '500' | '600';
type Props = {
    size: Size | null | undefined;
    text: string | ReactElement;
};
export default function ListText({ size, text }: Props): import("react/jsx-runtime").JSX.Element;
export {};
