import { ComponentProps } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
type Props = {
    accessibilityLabel: string;
    href: string;
    label: string;
    onClick?: ComponentProps<typeof ButtonLink>['onClick'];
    rel?: ComponentProps<typeof ButtonLink>['rel'];
    role: 'link';
    size?: ComponentProps<typeof ButtonLink>['size'];
    target?: ComponentProps<typeof ButtonLink>['target'];
} | {
    accessibilityLabel: string;
    label: string;
    onClick: ComponentProps<typeof Button>['onClick'];
    role: 'button';
    size?: ComponentProps<typeof Button>['size'];
};
export default function PrimaryAction({ accessibilityLabel, label, size, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
