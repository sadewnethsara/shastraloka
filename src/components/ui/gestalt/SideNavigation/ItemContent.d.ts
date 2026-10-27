import { ReactElement, ReactNode } from 'react';
import icons from '../icons/index';
import { Indexable } from '../zIndex';
export declare const NESTING_MARGIN_START_MAP: {
    readonly '0': "var(--space-400)";
    readonly '1': "var(--space-1200)";
    readonly '2': "68px";
};
type IconType = keyof typeof icons | {
    __path: string;
};
type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
};
type Counter = {
    number: string;
    accessibilityLabel: string;
};
type PrimaryAction = {
    icon?: 'ellipsis' | 'edit' | 'trash-can';
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
    }) => void;
    tooltip: {
        accessibilityLabel?: string;
        text: string;
        zIndex?: Indexable;
    };
    dropdownItems?: ReadonlyArray<ReactElement>;
};
type Props = {
    active?: 'page' | 'section';
    hovered: boolean;
    focused: boolean;
    badge?: BadgeType;
    counter?: Counter;
    icon?: IconType;
    label: string;
    subtext?: string;
    disabled?: boolean;
    notificationAccessibilityLabel?: string;
    primaryAction?: PrimaryAction;
    setCompression: (arg1: 'compress' | 'none') => void;
    hasBorder?: boolean;
    isGroup?: boolean;
    children?: ReactNode;
};
export default function ItemContent({ active, badge, counter, icon, label, subtext, disabled, primaryAction, notificationAccessibilityLabel, setCompression, hovered, focused, hasBorder, isGroup, children, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
