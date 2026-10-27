import { Indexable } from '../zIndex';
type BadgeObject = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
type TrendObject = {
    accessibilityLabel: string;
    value: number;
};
type Props = {
    badge?: BadgeObject;
    /**
     * Changes the color of the text and internal items to be disabled
     */
    disabled?: boolean;
    /**
     * Number of lines to truncate the title value
     */
    lineClamp?: number;
    /**
     * Min width length for the title
     */
    minTitleWidth?: number;
    /**
     * Max width for the title
     */
    maxTitleWidth?: number;
    /**
     * number of lines to have the row height for the title
     */
    numTitleRows?: number;
    size?: 'md' | 'lg';
    title: string;
    tooltipText?: string;
    trend?: TrendObject;
    trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto';
    tooltipZIndex?: Indexable;
    value: string;
};
export default function InternalDatapoint({ badge, disabled, lineClamp, minTitleWidth, maxTitleWidth, numTitleRows, size, title, tooltipText, tooltipZIndex, trend, trendSentiment, value, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
