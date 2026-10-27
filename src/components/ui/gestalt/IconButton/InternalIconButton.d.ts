import icons from '../icons/index';
import { Indexable } from '../zIndex';
type Props = {
    accessibilityLabel: string;
    accessibilityControls?: string;
    accessibilityExpanded?: boolean;
    accessibilityHaspopup?: boolean;
    accessibilityPopupRole?: 'menu' | 'dialog';
    focusColor?: 'lightBackground' | 'darkBackground';
    bgColor?: 'transparent' | 'transparentDarkBackground' | 'transparentDarkGray' | 'gray' | 'lightGray' | 'washLight' | 'white' | 'red' | 'elevation';
    dangerouslySetSvgPath?: {
        __path: string;
    };
    dataTestId?: string;
    disabled?: boolean;
    icon?: keyof typeof icons;
    iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
    label?: string;
    name?: string;
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    padding?: 1 | 2 | 3 | 4 | 5;
    ref?: HTMLButtonElement;
    selected?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 56;
    tabIndex?: -1 | 0;
    tooltip?: {
        accessibilityLabel?: string;
        inline?: boolean;
        idealDirection?: 'up' | 'right' | 'down' | 'left';
        text: string;
        zIndex?: Indexable;
    };
    type?: 'submit' | 'button';
};
declare const InternalIconButtonWithForwardRef: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
export default InternalIconButtonWithForwardRef;
