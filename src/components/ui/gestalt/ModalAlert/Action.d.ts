import { ComponentProps } from 'react';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
type LinkDataType = {
    accessibilityLabel: string;
    dataTestId?: string;
    disabled?: boolean;
    href: string;
    label: string;
    onClick?: ComponentProps<typeof ButtonLink>['onClick'];
    rel?: 'none' | 'nofollow';
    role: 'link';
    target?: null | 'self' | 'blank';
    type: string;
};
type ButtonDataType = {
    accessibilityLabel: string;
    dataTestId?: string;
    disabled?: boolean;
    label: string;
    onClick?: ComponentProps<typeof Button>['onClick'];
    role?: 'button';
    type: string;
};
type Props = LinkDataType | ButtonDataType;
export default function ModalAlertAction({ dataTestId, type, accessibilityLabel, disabled, label, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
