import { ReactNode } from 'react';
type Props = {
    /**
     * The media to be displayed.
     */
    children?: ReactNode;
    /**
     * Proportional relationship between width and height of element.
     */
    contentAspectRatio: number;
    /**
     * Desired final height of element in pixels.
     */
    height: number;
    /**
     * Desired final width of element in pixels.
     */
    width: number;
};
/**
 * [Letterbox](https://gestalt.pinterest.systems/web/letterbox) is useful if you have some source media which is larger than the area you want to display it in. For instance, you might have a really tall image and want it to be displayed in a neatly cropped square. While the ideal solution to this problem is to update the source image, this might not always be possible for either cost or performance reasons.
 *
 * Letterbox should be used in situations where you would otherwise use the CSS property `background-size: cover`.
 *
 * ![Letterbox light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Letterbox.spec.ts-snapshots/Letterbox-chromium-darwin.png)

 */
declare function Letterbox({ children, contentAspectRatio, height, width }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Letterbox {
    var displayName: string;
}
export default Letterbox;
