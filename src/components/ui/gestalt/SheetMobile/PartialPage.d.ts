import { ComponentProps, ReactNode } from 'react';
import Button from '../Button';
import Link from '../Link';
import { Indexable } from '../zIndex';
type OnClickType = (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    onDismissStart: () => void;
}) => void;
type Props = {
    accessibilityLabel?: string;
    align: 'start' | 'center';
    backIconButton?: {
        accessibilityLabel: string;
        onClick: OnClickType;
    };
    children?: ReactNode;
    closeOnOutsideClick?: boolean;
    footer?: ReactNode;
    forwardIconButton?: {
        accessibilityLabel: string;
        onClick: OnClickType;
    };
    heading?: ReactNode;
    onAnimationEnd: (arg1: {
        animationState: 'in' | 'out';
    }) => void | null | undefined;
    onDismiss: () => void;
    onOutsideClick?: (arg1: {
        event: React.MouseEvent<HTMLDivElement>;
    }) => void;
    padding?: 'default' | 'none';
    primaryAction?: {
        accessibilityLabel: string;
        href?: string;
        label: string;
        onClick: OnClickType;
        rel?: ComponentProps<typeof Link>['rel'];
        size?: ComponentProps<typeof Button>['size'];
        target?: ComponentProps<typeof Link>['target'];
    };
    role?: 'alertdialog' | 'dialog';
    showDismissButton?: boolean;
    size: 'default' | 'full' | 'auto';
    subHeading?: string;
    zIndex?: Indexable;
};
export default function PartialPage({ accessibilityLabel, align, backIconButton, children, closeOnOutsideClick, onAnimationEnd, onDismiss, onOutsideClick, footer, forwardIconButton, padding, primaryAction, heading, role, showDismissButton, size, subHeading, zIndex, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
