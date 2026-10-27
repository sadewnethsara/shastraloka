import { ReactElement, ReactNode } from 'react';
import icons from '../icons/index';
export type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
export default function AccordionExpandableItem({ accessibilityCollapseLabel, accessibilityExpandLabel, badge, children, icon, iconAccessibilityLabel, iconButton, id, isCollapsed, onExpand, summary, title, size, type, }: {
    accessibilityCollapseLabel: string;
    accessibilityExpandLabel: string;
    badge?: BadgeType;
    children?: ReactNode;
    icon?: keyof typeof icons;
    iconAccessibilityLabel?: string;
    iconButton?: ReactElement;
    id: string;
    isCollapsed: boolean;
    onExpand: (arg1: boolean) => void;
    summary?: ReadonlyArray<string>;
    size?: 'sm' | 'md' | 'lg';
    title: string;
    type?: 'error' | 'info';
}): import("react/jsx-runtime").JSX.Element;
