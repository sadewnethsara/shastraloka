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
    backIconButton: {
        accessibilityLabel: string;
        onClick: OnClickType;
    } | null | undefined;
    forwardIconButton: {
        accessibilityLabel: string;
        onClick: OnClickType;
    } | null | undefined;
    heading: ReactNode;
    id: string;
    onDismiss?: () => void;
    primaryAction: {
        accessibilityLabel: string;
        href?: string;
        label: string;
        onClick: OnClickType;
        rel?: ComponentProps<typeof Link>['rel'];
        size?: ComponentProps<typeof Button>['size'];
        target?: ComponentProps<typeof Link>['target'];
    } | null | undefined;
    showDismissButton: boolean | null | undefined;
    showGrabber?: boolean;
    subHeading: string | null | undefined;
};
export default function Header({ backIconButton, id, showDismissButton, heading, subHeading, forwardIconButton, onDismiss, primaryAction, showGrabber, align, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
