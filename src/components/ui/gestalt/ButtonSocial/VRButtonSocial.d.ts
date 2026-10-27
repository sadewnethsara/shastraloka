type ButtonProps = {
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
     */
    type: 'login' | 'continue' | 'signup';
    /**
     * Text to render inside the ButtonSocial to convey the function and purpose of the ButtonSocial.
     */
    service: 'apple' | 'facebook' | 'google' | 'email' | 'line';
};
/**
 * [ButtonLink](https://gestalt.pinterest.systems/buttonlink) should be used only to enable users to sign-up or sign-in to Pinterest using other trusted services.
 *
 * ![ButtonLink light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonLink.spec.ts-snapshots/ButtonLink-chromium-darwin.png)
 * ![ButtonLink dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonLink-dark.spec.ts-snapshots/ButtonLink-dark-chromium-darwin.png)
 */
declare const ButtonSocialWithForwardRef: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default ButtonSocialWithForwardRef;
