import { ComponentProps, ReactNode } from 'react';
import Button from '../Button';
import Link from '../Link';
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
    footer?: ReactNode;
    forwardIconButton?: {
        accessibilityLabel: string;
        onClick: OnClickType;
    };
    heading?: ReactNode;
    onDismiss: () => void;
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
    subHeading?: string;
};
export default function FullPage({ accessibilityLabel, align, backIconButton, children, onDismiss, footer, forwardIconButton, padding, primaryAction, heading, role, showDismissButton, subHeading, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
