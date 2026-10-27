import { ComponentProps } from 'react';
import Text from '../Text';
type Props = {
    graphicSrc: string;
    text: string;
    textColor: ComponentProps<typeof Text>['color'];
};
export default function ThumbnailButton({ graphicSrc, text, textColor }: Props): import("react/jsx-runtime").JSX.Element;
export {};
