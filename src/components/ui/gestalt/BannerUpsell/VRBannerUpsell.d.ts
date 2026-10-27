import { ComponentProps, ReactElement, ReactNode } from 'react';
import BannerUpsellForm from '../BannerUpsellForm';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
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
    onClick: ComponentProps<typeof Button>['onClick'];
    role?: 'button';
};
type Props = {
    /**
     * To create forms within BannerUpsell, pass BannerUpsell.Form as children.
     */
    children?: ReactNode;
    /**
     * Adds a dismiss button to the BannerUpsell. The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
     */
    dismissButton?: {
        accessibilityLabel?: string;
        onDismiss: () => void;
    };
    /**
     * Either an [Icon](https://gestalt.pinterest.systems/web/icon) or an [Image](https://gestalt.pinterest.systems/web/image) to render at the start of the banner. Width is not used with Icon. Image width defaults to 128px. See the [Icon](https://gestalt.pinterest.systems/web/bannerupsell#Icon) and [Image](https://gestalt.pinterest.systems/web/bannerupsell#Image) variants for more info.
     */
    imageData?: {
        component: ReactElement;
        mask?: {
            rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
            wash?: boolean;
        };
        width?: number;
    };
    /**
     * Main content of BannerUpsell, explains what is being offered or recommended. Content should be [localized](https://gestalt.pinterest.systems/web/bannerupsell#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/bannerupsell#Message) to learn more.
     */
    message: string | ReactElement;
    /**
     * Main action for people to take on BannerUpsell. If \`href\` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.'
     * If no \`href\` is supplied, the action will be a button.
     * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
     */
    primaryAction?: ActionDataType;
    /**
     * Secondary action for people to take on BannerUpsell. If \`href\` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.'
     * If no \`href\` is supplied, the action will be a button.
     * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
     */
    secondaryAction?: ActionDataType;
    /**
     * Brief title summarizing the BannerUpsell. Content should be [localized](https://gestalt.pinterest.systems/web/bannerupsell#Localization).
     */
    title?: string;
};
/**
 * [BannerUpsells](https://gestalt.pinterest.systems/web/bannerupsell) are banners that display short messages that focus on promoting an action or upgrading something the user already has.
 *
 *
 * ![BannerUpsell light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerUpsell.spec.ts-snapshots/BannerUpsell-chromium-darwin.png)
 * ![BannerUpsell dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerUpsell-dark.spec.ts-snapshots/BannerUpsell-dark-chromium-darwin.png)
 */
declare function BannerUpsell({ children, dismissButton, imageData, message, primaryAction, secondaryAction, title, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace BannerUpsell {
    var Form: typeof BannerUpsellForm;
    var displayName: string;
}
export default BannerUpsell;
