import { ReactNode } from 'react';
type Size = '100' | '200' | '300' | '400' | '500' | '600';
type ListTypeContextValues = 'bare' | 'ordered' | 'unordered';
type ListSpacingContextValues = 'regular' | 'condensed';
type ListStyleContextValues = {
    ol: ReadonlyArray<string>;
    ul: ReadonlyArray<string>;
};
type ListContextType = {
    type: ListTypeContextValues | null | undefined;
    size: Size | null | undefined;
    spacing: ListSpacingContextValues | null | undefined;
    style: ListStyleContextValues | null | undefined;
};
type Props = {
    children: ReactNode;
    type: ListTypeContextValues | null | undefined;
    size: Size | null | undefined;
    spacing: ListSpacingContextValues | null | undefined;
    style: ListStyleContextValues | null | undefined;
};
declare function ListProvider({ children, type, size, spacing, style }: Props): import("react/jsx-runtime").JSX.Element;
declare function useList(): ListContextType;
export { ListProvider, useList };
