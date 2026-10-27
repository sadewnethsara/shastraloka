import { ComponentProps } from 'react';
import TapArea from '../TapArea';
import TapAreaLink from '../TapAreaLink';
type Props = Pick<ComponentProps<typeof TapArea>, 'accessibilityControls' | 'accessibilityExpanded' | 'tapStyle'> & {
    accessibilityCurrent?: ComponentProps<typeof TapAreaLink>['accessibilityCurrent'];
    children: JSX.Element;
    href?: string;
    isExpandable: boolean | undefined;
    onLinkClick?: ComponentProps<typeof TapAreaLink>['onTap'];
    onTap: () => void;
    onBlur: () => void;
    onFocus: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
};
export default function SideNavigationGroupItemTapControl({ accessibilityControls, accessibilityCurrent, accessibilityExpanded, children, onLinkClick, onTap, href, isExpandable, tapStyle, onBlur, onFocus, onMouseEnter, onMouseLeave, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
