import { ReactNode } from 'react';
type ScrollBoundaryContainerContextType = {
    scrollBoundaryContainerRef: HTMLElement | null | undefined;
    addRef: (ref: HTMLElement) => void;
};
type Props = {
    children: ReactNode;
};
declare function ScrollBoundaryContainerProvider({ children }: Props): import("react/jsx-runtime").JSX.Element;
declare function useScrollBoundaryContainer(): ScrollBoundaryContainerContextType;
export { ScrollBoundaryContainerProvider, useScrollBoundaryContainer };
