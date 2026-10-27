import { ComponentProps } from 'react';
import ItemContent from './ItemContent';
import TapArea from '../TapArea';
type Display = 'expandable' | 'static';
type Props = Omit<ComponentProps<typeof ItemContent>, 'children' | 'hasBorder' | 'isGroup'> & {
    expanded: boolean;
    itemId: string;
    selectedItemId: string;
    display?: Display;
    hasActiveChild?: boolean;
    isLink?: boolean;
    expandIconButtonProps?: Pick<ComponentProps<typeof TapArea>, 'accessibilityControls' | 'accessibilityExpanded' | 'onTap'>;
};
export default function SideNavigationGroupContent({ expanded, selectedItemId, itemId, icon, label, badge, notificationAccessibilityLabel, counter, display, primaryAction, setCompression, hovered, focused, hasActiveChild, active, isLink, expandIconButtonProps, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
