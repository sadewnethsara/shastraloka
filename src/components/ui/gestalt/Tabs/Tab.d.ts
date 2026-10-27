import { ReactNode } from 'react';
import icons from '../icons/index';
type TabType = {
    notificationAccessibilityLabel?: string;
    href: string;
    id?: string;
    indicator?: 'dot' | number;
    text: ReactNode;
};
declare const TabWithForwardRef: import("react").ForwardRefExoticComponent<TabType & {
    bgColor: "default" | "transparent";
    dataTestId?: string;
    index: number;
    icon?: keyof typeof icons;
    size?: "sm" | "lg";
    isActive: boolean;
    onChange: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        readonly activeTabIndex: number;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
} & import("react").RefAttributes<HTMLDivElement>>;
export default TabWithForwardRef;
