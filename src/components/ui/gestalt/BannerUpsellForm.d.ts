import { ReactNode } from 'react';
type Props = {
    /**
     * Contents of the form, typically input components like [TextField](https://gestalt.pinterest.systems/web/textfield) or [NumberField](https://gestalt.pinterest.systems/web/numberfield).
     */
    children: ReactNode;
    /**
     * Callback triggered when the form is submitted.
     */
    onSubmit: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Text content of the submit button. Be sure to localize!
     */
    submitButtonText: string;
    /**
     * Label for the submit button used for screen readers. Should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility). Be sure to localize!
     */
    submitButtonAccessibilityLabel: string;
    /**
     * Used to disable the submit button.
     */
    submitButtonDisabled?: boolean;
};
/**
 * [BannerUpsell.Form](https://gestalt.pinterest.systems/web/bannerupsell#BannerUpsell.Form) can be used to add a short form to BannerUpsell for collecting data from the user.
 */
declare function BannerUpsellForm({ children, onSubmit, submitButtonText, submitButtonAccessibilityLabel, submitButtonDisabled, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace BannerUpsellForm {
    var displayName: string;
}
export default BannerUpsellForm;
