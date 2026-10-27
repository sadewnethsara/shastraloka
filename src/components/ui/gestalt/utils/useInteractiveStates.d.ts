/**
 * Returns event handlers that manage state for active, focus and hover states
 * @returns handled states
 */
declare const useInteractiveStates: () => {
    handleOnBlur: () => void;
    handleOnFocus: () => void;
    handleOnMouseDown: () => void;
    handleOnMouseEnter: () => void;
    handleOnMouseLeave: () => void;
    handleOnMouseUp: () => void;
    isActive: boolean;
    isFocused: boolean;
    isHovered: boolean;
};
export default useInteractiveStates;
