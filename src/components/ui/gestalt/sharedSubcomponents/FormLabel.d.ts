type SizeType = 'sm' | 'md' | 'lg';
type Props = {
    id: string;
    label: string;
    labelDisplay?: 'visible' | 'hidden';
    size?: SizeType;
};
export default function FormLabel({ id, label, labelDisplay, size }: Props): import("react/jsx-runtime").JSX.Element;
export {};
