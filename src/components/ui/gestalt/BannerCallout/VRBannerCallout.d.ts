import { ComponentProps, ReactElement } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
type Props = {
    dismissButton?: {
        accessibilityLabel?: string;
        onDismiss: () => void;
    };
    iconAccessibilityLabel?: string;
    message: string | ReactElement;
    primaryAction?: {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
    } | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
    };
    secondaryAction?: {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
    } | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
    };
    type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
    title?: string;
};
export default function BannerCallout({ dismissButton, iconAccessibilityLabel, message, primaryAction, secondaryAction, type, title, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
