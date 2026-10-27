type Sentiment = 'good' | 'bad' | 'neutral' | 'auto';
type Props = {
    disabled?: boolean;
    iconAccessibilityLabel: string;
    sentiment?: Sentiment;
    value: number;
};
export default function Trend({ disabled, iconAccessibilityLabel, sentiment, value, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
