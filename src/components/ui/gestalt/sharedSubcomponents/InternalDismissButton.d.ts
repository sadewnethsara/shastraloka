import { ComponentProps } from 'react';
import Pog from '../Pog';
type Props = {
    accessibilityLabel: string;
    accessibilityControls?: string;
    iconColor?: ComponentProps<typeof Pog>['iconColor'];
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    size?: ComponentProps<typeof Pog>['size'];
};
declare const InternalDismissIconButtonWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLButtonElement>>;
export default InternalDismissIconButtonWithForwardRef;
