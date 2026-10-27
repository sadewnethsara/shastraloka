import { ReactElement } from 'react';
import icons from '../icons/index';
export type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
export default function AccordionTitle(props: {
    badge?: BadgeType;
    dataTestId?: string;
    icon?: keyof typeof icons;
    iconAccessibilityLabel?: string;
    iconButton?: ReactElement;
    title: string;
    type?: 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
}): import("react/jsx-runtime").JSX.Element;
