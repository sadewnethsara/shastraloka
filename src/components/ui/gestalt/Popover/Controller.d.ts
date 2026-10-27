import { ReactNode } from 'react';
import { Role } from './Contents';
import { Overflow } from '../boxTypes';
type Props = {
    accessibilityLabel?: string;
    anchor: HTMLElement;
    bgColor?: 'blue' | 'darkGray' | 'white';
    caret?: boolean;
    children?: ReactNode;
    onKeyDown?: (arg1: {
        event: React.KeyboardEvent<HTMLElement>;
    }) => void;
    id?: string;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    forceDirection?: boolean;
    onDismiss: () => void;
    role?: Role;
    rounding?: 2 | 4;
    shouldFocus?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    disablePortal?: boolean;
    scrollBoundary?: HTMLElement;
    hideWhenReferenceHidden?: boolean;
    onPositioned?: () => void;
    shouldTrapFocus?: boolean;
    overflow?: Extract<Overflow, 'auto' | 'hidden' | 'visible'>;
};
export default function Controller({ accessibilityLabel, anchor, bgColor, caret, children, id, idealDirection, forceDirection, role, rounding, shouldFocus, size, onDismiss, onKeyDown, disablePortal, scrollBoundary, hideWhenReferenceHidden, onPositioned, shouldTrapFocus, overflow, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
