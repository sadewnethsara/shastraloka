import { Props as TopItemProps } from '../SideNavigationTopItem';
export type Props = Pick<TopItemProps, 'active' | 'notificationAccessibilityLabel'> & {
    accessibilityLabel?: string;
};
export default function ItemsEllipsis({ active, accessibilityLabel, notificationAccessibilityLabel, }: Props): import("react/jsx-runtime").JSX.Element;
