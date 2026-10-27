import { ComponentProps } from 'react';
import TapAreaLink from '../TapAreaLink';
type Props = {
    label: string;
    href: string;
    active: boolean;
    onClick?: ComponentProps<typeof TapAreaLink>['onTap'];
};
export default function TableOfContentsAnchor({ label, active, href, onClick }: Props): import("react/jsx-runtime").JSX.Element;
export {};
