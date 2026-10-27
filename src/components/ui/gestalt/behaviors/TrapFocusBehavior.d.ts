import { ReactNode } from 'react';
type Props = {
    children?: ReactNode;
};
/**
 * TrapFocusBehavior is used by components like Modal and OverlayPanel to ensure that only elements within children components can be focused.
 */
export default function TrapFocusBehavior({ children }: Props): import("react/jsx-runtime").JSX.Element;
export {};
