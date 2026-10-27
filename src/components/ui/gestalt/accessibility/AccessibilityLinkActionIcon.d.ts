import { ComponentProps } from 'react';
import Icon from '../Icon';
type Props = {
    color?: ComponentProps<typeof Icon>['color'];
    size: ComponentProps<typeof Icon>['size'];
    icon?: 'visit' | 'directional-arrow-right' | 'download';
};
export default function AccessibilityLinkActionIcon({ size, color, icon }: Props): import("react/jsx-runtime").JSX.Element;
export {};
