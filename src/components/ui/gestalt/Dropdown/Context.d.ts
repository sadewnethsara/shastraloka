type DropdownContextType = {
    id: string;
    hoveredItemIndex: number | null | undefined;
    setHoveredItemIndex: (n: number | null | undefined) => void;
    setOptionRef: (arg1?: HTMLElement | null | undefined) => void;
    focusedItemIndex: number | null | undefined;
    setFocusedItemIndex: (n: number | null | undefined) => void;
};
declare const DropdownContextProvider: import("react").Provider<DropdownContextType>;
declare const DropdownContextConsumer: import("react").Consumer<DropdownContextType>;
export { DropdownContextConsumer, DropdownContextProvider };
