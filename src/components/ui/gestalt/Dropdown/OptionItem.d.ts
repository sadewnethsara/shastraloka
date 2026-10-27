import { ComponentProps, ReactNode } from 'react';
import Avatar from '../Avatar';
import { FontWeight } from '../textTypes';
export type OptionItemType = {
    label: string;
    subtext?: string;
    value: string;
};
type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
type IconEndType = 'visit' | 'directional-arrow-right' | 'download';
type Props = {
    avatar?: Omit<ComponentProps<typeof Avatar>, 'size' | 'verified' | 'outline'> & {
        size: 'sm' | 'md';
    };
    badge?: BadgeType;
    children?: ReactNode;
    dataTestId?: string;
    disabled?: boolean;
    focusedItemIndex: number | null | undefined;
    hoveredItemIndex: number | null | undefined;
    href?: string;
    id: string;
    index: number;
    iconEnd?: IconEndType;
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
        mobileOnDismissStart: () => void;
    }) => void;
    onSelect?: (arg1: {
        item: OptionItemType;
        event: React.ChangeEvent<HTMLInputElement>;
    }) => void;
    option: OptionItemType;
    selected?: OptionItemType | ReadonlyArray<OptionItemType> | null;
    setHoveredItemIndex: (arg1: number | null | undefined) => void;
    setFocusedItemIndex: (arg1: number | null | undefined) => void;
    textWeight?: FontWeight;
};
declare const OptionItemWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLElement | null | undefined>>;
export default OptionItemWithForwardRef;
