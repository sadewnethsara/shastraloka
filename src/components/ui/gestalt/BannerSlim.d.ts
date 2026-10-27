import { ComponentProps, ReactElement } from 'react';
import Button from './Button';
import ButtonLink from './ButtonLink';
type HelperLinkType = {
    accessibilityLabel: string;
    href: string;
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    target?: null | 'self' | 'blank';
    text: string;
};
type PrimaryActionType = {
    accessibilityLabel: string;
    disabled?: boolean;
    href: string;
    label: string;
    onClick?: ComponentProps<typeof ButtonLink>['onClick'];
    rel?: 'none' | 'nofollow';
    role: 'link';
    target?: null | 'self' | 'blank';
    isInVRExperiment?: boolean;
} | {
    accessibilityLabel: string;
    isInVRExperiment?: boolean;
    disabled?: boolean;
    label: string;
    onClick: ComponentProps<typeof Button>['onClick'];
    role?: 'button';
};
type Props = {
    /**
     * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the message. See the [Message variant](https://gestalt.pinterest.systems/web/bannerslim#Message) to learn more.
     */
    helperLink?: HelperLinkType;
    /**
     * Label to describe the status icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerslim#Accessibility) for details on proper usage.
     */
    iconAccessibilityLabel?: string;
    /**
     * Main content of BannerSlim. Content should be [localized](https://gestalt.pinterest.systems/web/bannerslim#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/bannerslim#Message) to learn more.
     *
     */
    message: string | ReactElement;
    /**
     * Adds a dismiss button to BannerSlim. Uses default accessibility label. See the [Dismiss button](https://gestalt.pinterest.systems/web/bannerslim#Dismiss-button) variant to learn more.
     */
    onDismiss?: () => void;
    /**
     * Main action for users to take on BannerSlim. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     * If no `href` is supplied, the action will be a button.
     * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerslim#Accessibility).
     * See the [Primary action](https://gestalt.pinterest.systems/web/bannerslim#Primary-action) variant to learn more.
     *
     * Note that actions are not available on compact ("___Bare" type) BannerSlims.
     */
    primaryAction?: PrimaryActionType;
    /**
     * The type of BannerSlim. See the [variants](https://gestalt.pinterest.systems/web/bannerslim#Variants) to learn more.
     */
    type?: 'neutral' | 'error' | 'info' | 'warning' | 'success' | 'recommendation' | 'errorBare' | 'infoBare' | 'warningBare' | 'successBare' | 'recommendationBare';
};
/**
 * [BannerSlim](https://gestalt.pinterest.systems/web/bannerslim) conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. Since they are about a specific section of a page or surface, BannerSlim sits inside of a container, and not at the top of the page. For alerts that apply to the whole page, use [BannerCallout](https://gestalt.pinterest.systems/web/bannercallout).
 *
 * ![BannerSlim light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerSlim.spec.ts-snapshots/BannerSlim-chromium-darwin.png)
 * ![BannerSlim dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerSlim-dark.spec.ts-snapshots/BannerSlim-dark-chromium-darwin.png)
 *
 */
declare function BannerSlim({ helperLink, iconAccessibilityLabel, message, onDismiss, primaryAction, type, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace BannerSlim {
    var displayName: string;
}
export default BannerSlim;
