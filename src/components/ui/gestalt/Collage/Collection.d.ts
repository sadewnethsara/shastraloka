import { ReactNode } from 'react';
type Props = {
    Item?: (arg1: {
        idx: number;
    }) => ReactNode;
    layout: ReadonlyArray<{
        top: number;
        left: number;
        width: number;
        height: number;
    }>;
    renderItem?: (arg1: {
        idx: number;
    }) => ReactNode;
    viewportTop?: number;
    viewportLeft?: number;
    viewportWidth?: number;
    viewportHeight?: number;
};
export default function Collection(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
