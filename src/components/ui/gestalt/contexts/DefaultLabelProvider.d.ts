import { ReactNode } from 'react';
/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to DefaultLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 * - Update these files with the new labels:
 *   - Test file for this Provider
 *      packages/gestalt/src/contexts/DefaultLabelProvider.jsdom.test.tsx
 *   - Docs example for this Provider
 *      docs/examples/defaultlabelprovider/translations.tsx
 */
export type DefaultLabelContextType = {
    Accordion: {
        accessibilityCollapseLabel: string;
        accessibilityExpandLabel: string;
    };
    ActivationCard: {
        accessibilityDismissButtonLabel: string;
    };
    BannerOverlay: {
        accessibilityDismissButtonLabel: string;
    };
    BannerCallout: {
        accessibilityDismissButtonLabel: string;
        iconAccessibilityLabelError: string;
        iconAccessibilityLabelInfo: string;
        iconAccessibilityLabelRecommendation: string;
        iconAccessibilityLabelWarning: string;
        iconAccessibilityLabelSuccess: string;
    };
    ButtonSocial: {
        textLoginEmail: string;
        textLoginFacebook: string;
        textLoginGoogle: string;
        textLoginApple: string;
        textLoginLine: string;
        textContinueEmail: string;
        textContinueFacebook: string;
        textContinueGoogle: string;
        textContinueApple: string;
        textContinueLine: string;
        textSignupEmail: string;
        textSignupFacebook: string;
        textSignupGoogle: string;
        textSignupApple: string;
        textSignupLine: string;
    };
    ChartGraph: {
        accessibilityLabelPrefixText: string;
        defaultViewText: string;
        accessibleViewText: string;
        tabularData: string;
        accessibilityLabelDismissModal: string;
        tableSeriesText: string;
        tableXAxisText: string;
        tableYAxisText: string;
        downloadCsvButtonText: string;
        cancelButtonText: string;
    };
    ComboBox: {
        noResultText: string;
        accessibilityClearButtonLabel: string;
    };
    DatePicker: {
        accessibilityDismissButtonLabel: string;
        dismissButton: string;
        openCalendar: string;
        previousMonth: string;
        nextMonth: string;
    };
    DateRange: {
        cancelText: string;
        applyText: string;
    };
    Link: {
        accessibilityNewTabLabel: string;
        accessibilityDownloadLabel: string;
    };
    Modal: {
        accessibilityDismissButtonLabel: string;
    };
    Popover: {
        accessibilityDismissButtonLabel: string;
    };
    OverlayPanel: {
        accessibilityDismissButtonLabel: string;
        dismissConfirmationMessage: string;
        dismissConfirmationSubtext: string;
        dismissConfirmationPrimaryActionText: string;
        dismissConfirmationPrimaryActionTextLabel: string;
        dismissConfirmationSecondaryActionText: string;
        dismissConfirmationSecondaryActionTextLabel: string;
    };
    SheetMobile: {
        accessibilityDismissButtonLabel: string;
        accessibilityGrabberLabel: string;
        accessibilityLabel: string;
    };
    SideNavigation: {
        accessibilityDismissButtonLabel: string;
        accessibilityCollapseButtonLabel: string;
        accessibilityExpandButtonLabel: string;
        accessibilityEllipsisLabel: string;
    };
    BannerSlim: {
        accessibilityDismissButtonLabel: string;
        iconAccessibilityLabelError: string;
        iconAccessibilityLabelInfo: string;
        iconAccessibilityLabelRecommendation: string;
        iconAccessibilityLabelWarning: string;
        iconAccessibilityLabelSuccess: string;
    };
    SearchField: {
        accessibilityClearButtonLabel: string;
    };
    Spinner: {
        accessibilityLabel: string;
    };
    Tabs: {
        accessibilityNotificationLabel: string;
    };
    TableOfContents: {
        accessibilityLabel: string;
    };
    Tag: {
        accessibilityErrorIconLabel: string;
        accessibilityRemoveIconLabel: string;
        accessibilityWarningIconLabel: string;
    };
    TagData: {
        accessibilityRemoveIconLabel: string;
    };
    TextField: {
        accessibilityHidePasswordLabel: string;
        accessibilityShowPasswordLabel: string;
    };
    BannerUpsell: {
        accessibilityDismissButtonLabel: string;
    };
    Video: {
        accessibilityMaximizeLabel: string;
        accessibilityMinimizeLabel: string;
        accessibilityMuteLabel: string;
        accessibilityPauseLabel: string;
        accessibilityPlayLabel: string;
        accessibilityProgressLabel: string;
        accessibilityUnmuteLabel: string;
        accessibilityHideCaptionsLabel: string;
        accessibilityShowCaptionsLabel: string;
    };
    HelpButton: {
        tooltipMessage: string;
    };
    Toast: {
        accessibilityDismissButtonLabel: string;
        accessibilityIconSuccessLabel: string;
        accessibilityIconErrorLabel: string;
        accessibilityProcessingLabel: string;
    };
};
export declare const fallbackLabels: DefaultLabelContextType;
type Props = {
    children: ReactNode;
    /**
     * An object describing the default strings to be used by supported component labels throughout your app. If your app supports i18n, don't forget to translate your strings!
     *
     * Note that all supported labels for all supported components must be provided if using this Provider. Omit this prop to use default (English) strings for supported labels.
     *
     * See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.tsx) for the specific shape of this object.
     */
    labels?: null | DefaultLabelContextType;
};
/**
 * [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to provide default strings for Gestalt component labels that support it. This allows for faster development by reducing boilerplate props at the callsite.
 */
export default function DefaultLabelProvider({ children, labels }: Props): import("react/jsx-runtime").JSX.Element;
type ValidComponent = keyof DefaultLabelContextType;
export declare function useDefaultLabelContext<C extends ValidComponent>(componentName: C): DefaultLabelContextType[C];
export {};
