import { ReactNode } from 'react';
export interface Indexable {
    index(): number;
}
type SideNavigationContextType = {
    selectedItemId: string;
    setSelectedItemId: (arg1: string) => void;
    selectedMobileChildren: ReactNode | null;
    setSelectedMobileChildren: (arg1: ReactNode | null) => void;
    hideActiveChildren: boolean;
    setHideActiveChildren: (arg1: boolean) => void;
    overlayPreview: boolean;
    setOverlayPreview: (arg1: boolean) => void;
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapse?: (arg1: boolean) => void;
    transitioning?: boolean;
    setTransitioning: (arg1: boolean) => void;
    dismissButton?: {
        accessibilityLabel?: string;
        onDismiss: () => void;
        id: string;
    };
};
type Props = {
    children: ReactNode;
    dismissButton?: {
        accessibilityLabel?: string;
        onDismiss: () => void;
        id: string;
    };
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapse?: (arg1: boolean) => void;
    onPreview?: (arg1: boolean) => void;
};
declare const SideNavigationConsumer: import("react").Consumer<SideNavigationContextType>;
declare function SideNavigationProvider({ children, dismissButton, collapsible, collapsed, onCollapse: onCollapseProp, onPreview, }: Props): import("react/jsx-runtime").JSX.Element;
declare function useSideNavigation(): SideNavigationContextType;
export { SideNavigationConsumer, SideNavigationProvider, useSideNavigation };
