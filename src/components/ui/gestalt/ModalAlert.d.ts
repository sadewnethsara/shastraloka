import { ComponentProps, ReactNode } from 'react';
import Button from './Button';
import ButtonLink from './ButtonLink';
export type ActionDataType = {
    accessibilityLabel: string;
    dataTestId?: string;
    disabled?: boolean;
    href: string;
    label: string;
    onClick?: ComponentProps<typeof ButtonLink>['onClick'];
    rel?: 'none' | 'nofollow';
    role: 'link';
    target?: null | 'self' | 'blank';
} | {
    accessibilityLabel: string;
    dataTestId?: string;
    disabled?: boolean;
    label: string;
    onClick?: ComponentProps<typeof Button>['onClick'];
    role?: 'button';
};
type Props = {
    /**
     * Label to describe the dismiss button's purpose.
     */
    accessibilityDismissButtonLabel?: string;
    /**
     * String that clients such as VoiceOver will read to describe the modal. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/web/modalalert#Accessibility) for more info.
     */
    accessibilityModalLabel: string;
    /**
     * Supply the element(s) that will be used as ModalAlert's main content. See the [Best Practices](https://gestalt.pinterest.systems/web/modalalert#Best-practices) for more info.
     */
    children: ReactNode;
    /**
     * The text used for ModalAlert's heading.
     */
    heading: string;
    /**
     * Callback fired when ModalAlert is dismissed by clicking on the backdrop outside of the ModalAlert or when the dismiss icon button is clicked (for default ModalAlerts).
     */
    onDismiss: () => void;
    /**
     * Determines the icon and dismiss pattern of the ModalAlert. See the [warning](https://gestalt.pinterest.systems/web/modalalert#Warning-type) and [error](https://gestalt.pinterest.systems/web/modalalert#Error-type)  variants for more info.
     */
    type?: 'default' | 'warning' | 'error';
    /**
     * Main action for users to take on ModalAlert. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     * If no `href` is supplied, the action will be a button.
     * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/modalalert#Accessibility).
     */
    primaryAction: ActionDataType;
    /**
     * Secondary action for users to take on ModalAlert. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     * If no `href` is supplied, the action will be a button.
     * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/modalalert#Accessibility).
     */
    secondaryAction?: ActionDataType;
};
/**
 * A [ModalAlert](https://gestalt.pinterest.systems/web/modalalert) is a simple modal dialog used to alert a user of an issue, or to request confirmation after a user-triggered action. ModalAlert overlays and blocks page content until it is dismissed by the user.
 *
 * ![ModalAlert light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ModalAlert.spec.ts-snapshots/ModalAlert-chromium-darwin.png)
 * ![ModalAlert mobile](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ModalAlert-mobile.spec.ts-snapshots/ModalAlert-mobile-chromium-darwin.png)
 * ![ModalAlert dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ModalAlert-dark.spec.ts-snapshots/ModalAlert-dark-chromium-darwin.png)
 *
 */
declare function ModalAlert({ accessibilityDismissButtonLabel, accessibilityModalLabel, type, children, onDismiss, heading, primaryAction, secondaryAction, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace ModalAlert {
    var displayName: string;
}
export default ModalAlert;
