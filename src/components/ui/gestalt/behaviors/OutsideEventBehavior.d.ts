import { ReactNode } from 'react';
type Props = {
    children: ReactNode;
    onClick?: (event: MouseEvent) => void;
};
export default function OutsideEventBehavior({ children, onClick }: Props): import("react/jsx-runtime").JSX.Element;
export {};
