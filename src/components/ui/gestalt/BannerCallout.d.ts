import { ComponentProps, ReactElement } from 'react';
import Button from './Button';
import ButtonLink from './ButtonLink';
export type ActionDataType = {
    accessibilityLabel: string;
    disabled?: boolean;
    href: string;
    label: string;
    onClick?: ComponentProps<typeof ButtonLink>['onClick'];
    rel?: 'none' | 'nofollow';
    role: 'link';
    target?: null | 'self' | 'blank';
} | {
    accessibilityLabel: string;
    disabled?: boolean;
    label: string;
    onClick?: ComponentProps<typeof Button>['onClick'];
    role?: 'button';
};
type Props = {
    /**
     * Adds a dismiss button to BannerCallout. See the [Dismissible variant](https://gestalt.pinterest.systems/web/bannercallout#Dismissible) for more info.
     * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
     */
    dismissButton?: {
        accessibilityLabel?: string;
        onDismiss: () => void;
    };
    /**
     * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility) for details on proper usage.
     */
    iconAccessibilityLabel?: string;
    /**
     * Main content of BannerCallout. Content should be [localized](https://gestalt.pinterest.systems/web/bannercallout#Localization).
     *
     * See the [message variant](https://gestalt.pinterest.systems/web/bannercallout#Message) to learn more. Refer to the [Best Practices](https://gestalt.pinterest.systems/web/bannercallout#Best-practices) for content guidelines.
     */
    message: string | ReactElement;
    /**
     * Main action for users to take on BannerCallout. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     * If no `href` is supplied, the action will be a button.
     * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
     */
    primaryAction?: {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
    } | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
    };
    /**
     * Secondary action for users to take on BannerCallout. If role='link', the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     * If role='button' (or undefined), the action will be a button.
     * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
     */
    secondaryAction?: {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
    } | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
    };
    /**
     * The category of BannerCallout. See [Variants](https://gestalt.pinterest.systems/web/bannercallout#Variants) to learn more.
     */
    type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
    /**
     * Brief title summarizing BannerCallout. Content should be [localized](https://gestalt.pinterest.systems/web/bannercallout#Localization).
     */
    title?: string;
};
/**
 * [BannerCallout](https://gestalt.pinterest.systems/web/bannercallout) is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.
 *
 * ![BannerCallout light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerCallout.spec.ts-snapshots/BannerCallout-chromium-darwin.png)
 * ![BannerCallout dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerCallout-dark.spec.ts-snapshots/BannerCallout-dark-chromium-darwin.png)
 *
 */
declare function BannerCallout({ dismissButton, iconAccessibilityLabel, message, primaryAction, secondaryAction, type, title, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace BannerCallout {
    var displayName: string;
}
export default BannerCallout;
