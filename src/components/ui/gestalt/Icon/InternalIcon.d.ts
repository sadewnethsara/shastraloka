import compactIconsClassic from '../icons/compact/index';
import icons from '../icons/index';
export type IconColor = 'default' | 'disabled' | 'subtle' | 'success' | 'error' | 'warning' | 'info' | 'recommendation' | 'inverse' | 'shopping' | 'brandPrimary' | 'light' | 'dark';
type IconName = keyof typeof icons | keyof typeof compactIconsClassic;
type Props = {
    accessibilityDescribedby?: string;
    accessibilityLabel: string;
    color?: IconColor;
    dataTestId?: string;
    icon?: IconName;
    dangerouslySetSvgPath?: {
        __path: string;
    };
    inline?: boolean;
    size?: number | string;
};
declare function InternalIcon({ accessibilityDescribedby, accessibilityLabel, color, dangerouslySetSvgPath, dataTestId, icon, inline, size, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace InternalIcon {
    var displayName: string;
}
export default InternalIcon;
