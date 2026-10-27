import { ReactNode } from 'react';
type Props = {
    /**
     * Context lets a parent component provide data to the entire tree below it. Only components within the ColorSchemeProvider tree will be able to subscribe to it.
     */
    children: ReactNode;
    /**
     * Use with caution! Set an id in your provider to limit the scope of the provider to just the children. This should only be used for cases where you want to enable dark mode in delimited sections to examplify dark mode itself.
     * If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root). A global implementation is critical for displaying dark mode correctly: when dark mode is not set globally, [React Portal](https://react.dev/reference/react-dom/createPortal)-based components, mostly Popovers and Tooltips, will not render in dark mode. The main ColorSchemeProvider in your app should NOT have an id set.
     */
    id?: string | null | undefined;
    /**
     * Sets the language mode that manages the line height for the selected language.
     */
    languageMode?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi';
    /**
     * Forces a theme. It allows applying a theme on delimited sections. It should be accompanied of a root selector.
     */
    forceTheme?: 'classic' | 'visualrefresh' | 'calico01';
    /**
     * Forces a theme. It allows applying a theme on delimited sections. It should be accompanied of forceTheme.
     */
    rootSelector?: string;
};
/**
 * [DesignTokensProvider](https://gestalt.pinterest.systems/web/utilities/designtokensprovider) is a stylesheet containing Gestalt' design system tokens. It manages themes and modes. It's dependent on parent providers: ExperimentProvider and [ColorSchemeProvider](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider)
 */
export default function DesignTokensProvider({ children, id, languageMode, forceTheme, rootSelector, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
