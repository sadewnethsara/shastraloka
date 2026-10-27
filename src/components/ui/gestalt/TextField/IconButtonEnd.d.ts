import { ComponentProps } from 'react';
import TapArea from '../TapArea';
type Props = {
    accessibilityChecked?: boolean;
    accessibilityHidden?: boolean;
    accessibilityLabel?: string;
    hoverStyle?: 'default' | 'none';
    icon: 'arrow-down' | 'cancel' | 'eye' | 'eye-hide' | 'compact-chevron-down' | 'compact-cancel';
    onClick: () => void;
    pogPadding?: 1 | 2;
    role?: 'switch';
    tapStyle?: ComponentProps<typeof TapArea>['tapStyle'];
    tooltipText?: string;
};
export default function IconButtonEnd({ accessibilityChecked, accessibilityHidden, accessibilityLabel, hoverStyle, icon, onClick, pogPadding, role, tapStyle, tooltipText, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
