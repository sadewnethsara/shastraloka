import { ReactNode } from 'react';
import { Size } from './constants';
type Props = {
    children: ReactNode;
    pileCount: number;
    index: number;
    size: Size;
};
export default function PositioningWrapper({ size, pileCount, index, children }: Props): import("react/jsx-runtime").JSX.Element;
export {};
