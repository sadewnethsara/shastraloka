import { ComponentProps } from 'react';
import ItemContent from './ItemContent';
import TapArea from '../TapArea';
type Props = {
    active?: ComponentProps<typeof ItemContent>['active'];
    expanded: boolean;
    isLink?: boolean;
    expandIconButtonProps?: Pick<ComponentProps<typeof TapArea>, 'accessibilityControls' | 'accessibilityExpanded' | 'onTap'>;
};
export default function SideNavigationGroupExpandIconButton({ expanded, active, isLink: hasLink, expandIconButtonProps, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
