import { ComponentProps, ReactElement } from 'react';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { Indexable } from './zIndex';
type Props = {
    /**
     * Adds a dismiss button to BannerOverlay. See the [Dismissible variant](https://gestalt.pinterest.systems/web/banneroverlay#Dismissible) for more info.
     */
    onDismiss?: () => void;
    /**
     * Main content of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
     */
    message: string | ReactElement;
    /**
     * Distance (in pixels) from the viewport edge (top will be used, if desktop, bottom will be used, if mobile). See the [Responsive section](https://gestalt.pinterest.systems/web/banneroverlay#Responsive) to learn more.
     */
    offset?: {
        bottom: number;
        top: number;
        reverseOffset?: boolean;
    };
    /**
     * Adds an optional primary button for user interaction.
     * Main action for users to take on BannerOverlay. If href is supplied, the action will serve as a link.
     * If no href is supplied, the action will be a button.
     * The accessibilityLabel should follow the Accessibility guidelines.
     * See the Primary action variant to learn more.
     */
    primaryAction?: {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: ComponentProps<typeof ButtonLink>['rel'];
        role: 'link';
        size?: ComponentProps<typeof ButtonLink>['size'];
        target?: ComponentProps<typeof ButtonLink>['target'];
    } | {
        accessibilityLabel: string;
        label: string;
        onClick: ComponentProps<typeof Button>['onClick'];
        role?: 'button';
        size?: ComponentProps<typeof Button>['size'];
    };
    /**
     * Adds an optional button for user interaction.
     * In this case, we use our ButtonGroup component.
     */
    secondaryAction?: {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: ComponentProps<typeof ButtonLink>['rel'];
        role: 'link';
        size?: ComponentProps<typeof ButtonLink>['size'];
        target?: ComponentProps<typeof ButtonLink>['target'];
    } | {
        accessibilityLabel: string;
        label: string;
        onClick: ComponentProps<typeof Button>['onClick'];
        role?: 'button';
        size?: ComponentProps<typeof Button>['size'];
    };
    /**
     * An optional thumbnail to display next to the text.
     */
    thumbnail?: {
        image: ReactElement;
        icon?: never;
    } | {
        image?: never;
        icon: ReactElement;
    };
    /**
     *  Heading of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
     */
    title?: string;
    /**
     *  zIndex of BannerOverlay. See the [zIndex guidelines](https://gestalt.pinterest.systems/web/banneroverlay#zIndex) to learn more.
     */
    zIndex?: Indexable;
};
/**
 * [BannerOverlays](https://gestalt.pinterest.systems/web/banneroverlay) displays short educational messages when users have performed actions that indicate some intent, such as a related pin tap or idea pin swipe. It is scrim-less, meaning users can scroll content underneath without having a wash layer on top of the content.
 *
 * BannerOverlay is a sticky component triggered by scroll, on tap or long-press, placed at the bottom of the screen.
 * ![BannerOverlay light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerOverlay.spec.ts-snapshots/BannerOverlay-chromium-darwin.png)
 */
declare function BannerOverlay({ message, title, onDismiss, primaryAction, secondaryAction, offset, thumbnail, zIndex, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace BannerOverlay {
    var displayName: string;
}
export default BannerOverlay;
