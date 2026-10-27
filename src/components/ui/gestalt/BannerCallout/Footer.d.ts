import { ComponentProps } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
type Props = {
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
    checkWrapped?: boolean;
    marginTop: 0 | 4 | 6;
    buttonSize: 'md' | 'lg';
    fullHeight?: boolean;
};
export default function Footer({ secondaryAction, primaryAction, fullHeight, type, checkWrapped, marginTop, buttonSize, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
