import { ComponentProps, ReactElement } from 'react';
import Pog from '../Pog';
import TapArea from '../TapArea';
import { Indexable } from '../zIndex';
type Props = {
    icon?: 'ellipsis' | 'edit' | 'trash-can';
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
    }) => void;
    setCompression: (arg1: 'compress' | 'none') => void;
    forceIconButton: 'force' | 'default';
    setForceIconButton: (arg1: 'force' | 'default') => void;
    setShowIconButton: (arg1: 'show' | 'hide') => void;
    isItemActive: boolean;
    tooltip: {
        accessibilityLabel?: string;
        text: string;
        zIndex?: Indexable;
    };
    dropdownItems?: ReadonlyArray<ReactElement>;
};
type ItemIconButtonProps = ComponentProps<typeof TapArea> & {
    icon: ComponentProps<typeof Pog>['icon'];
    isItemActive: boolean;
    selected?: boolean;
};
export declare const ItemIconButton: import("react").ForwardRefExoticComponent<Omit<ItemIconButtonProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default function PrimaryActionIconButton({ icon, onClick, tooltip, dropdownItems, isItemActive, setShowIconButton, forceIconButton, setForceIconButton, setCompression, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
