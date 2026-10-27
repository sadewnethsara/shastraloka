import { Props } from '../SideNavigationGroup';
type SideNavigationGroupMobileProps = Props & {
    hasActiveChild: boolean;
};
export default function SideNavigationGroupMobile({ children, badge, counter, display, hasActiveChild, icon, label, primaryAction, notificationAccessibilityLabel, }: SideNavigationGroupMobileProps): import("react/jsx-runtime").JSX.Element;
export {};
