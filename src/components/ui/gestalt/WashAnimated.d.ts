import { ReactNode } from 'react';
type Props = {
    /**
     * Used to force the "active" hover state visually.
     */
    active?: boolean | null | undefined;
    /**
     *
     */
    children?: ReactNode;
    /**
     * An optional [Image](https://gestalt.pinterest.systems/web/image) to be displayed at the top of the layout.
     */
    image?: ReactNode;
    /**
     * Optional callback fired when the user hovers over from WashAnimated.
     */
    onMouseEnter?: (arg1: {
        event: React.MouseEvent<HTMLDivElement>;
    }) => void;
    /**
     * Optional callback fired when the user hovers off WashAnimated.
     */
    onMouseLeave?: (arg1: {
        event: React.MouseEvent<HTMLDivElement>;
    }) => void;
};
/**
 * [WashAnimated](https://gestalt.pinterest.systems/web/washanimated) is used to highlight content in grids. It visually shows that children elements belong together and can highlight the items on hover.
 * ![WashAnimated light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/WashAnimated.spec.ts-snapshots/WashAnimated-chromium-darwin.png)
 * ![WashAnimated dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/WashAnimated-dark.spec.ts-snapshots/Button-dark-chromium-darwin.png)
 */
declare function WashAnimated({ active, children, image, onMouseEnter, onMouseLeave, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace WashAnimated {
    var displayName: string;
}
export default WashAnimated;
