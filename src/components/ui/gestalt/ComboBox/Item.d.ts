export type ComboBoxItemType = {
    label: string;
    subtext?: string;
    value: string;
};
type Props = {
    id: string;
    index: number;
    isHovered: boolean;
    isSelected: boolean;
    label: string;
    onSelect?: (arg1: {
        item: ComboBoxItemType;
        event: React.ChangeEvent<HTMLInputElement>;
    }) => void;
    setHoveredItemIndex: (arg1: number) => void;
    subtext?: string;
    value: string;
};
declare const ComboBoxItemWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLElement | null | undefined>>;
export default ComboBoxItemWithForwardRef;
