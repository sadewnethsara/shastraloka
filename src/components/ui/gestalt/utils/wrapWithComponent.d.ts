import { ComponentType, ReactNode } from 'react';
export default function wrapWithComponent<P>({ element, Component, props, index, }: {
    element: ReactNode | null | undefined;
    Component: ComponentType<P>;
    props: P;
    index: number;
}): string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null;
