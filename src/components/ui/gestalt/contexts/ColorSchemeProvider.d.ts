import { ReactNode } from 'react';
type ColorSchemeType = 'light' | 'dark' | 'userPreference';
type Props = {
    /**
     * Context lets a parent component provide data to the entire tree below it. Only components within the ColorSchemeProvider tree will be able to subscribe to it.
     */
    children: ReactNode;
    /**
     * The color scheme for components inside the ColorSchemeProvider. Use 'userPreference' to allow the end user to specify the color scheme via their browser settings, using the 'prefers-color-scheme' media query. See [color scheme](https://gestalt.pinterest.systems/web/utilities/colorschemeprovider#Color-scheme) variant for examples.
     */
    colorScheme?: ColorSchemeType;
};
/**
 * [DesignTokenProvider](https://gestalt.pinterest.systems/web/utilities/designtokenprovider).
 */
export default function ColorSchemeProvider({ children, colorScheme }: Props): import("react/jsx-runtime").JSX.Element;
export declare function useColorScheme(): {
    colorSchemeName: 'lightMode' | 'darkMode';
};
export {};
