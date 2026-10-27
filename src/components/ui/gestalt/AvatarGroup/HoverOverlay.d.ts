import { ReactNode } from 'react';
import { Size } from './constants';
type Props = {
    children: ReactNode;
    hovered?: boolean;
    size: Size;
};
export default function AvatarGroupHoverOverlay({ children, hovered, size }: Props): import("react/jsx-runtime").JSX.Element;
export {};
