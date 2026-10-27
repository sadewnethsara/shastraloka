export type InteractionStates = {
    disabled: boolean;
    hovered: boolean;
    selected: boolean;
};
/**
 *
 * Given an interactions state for a checkbox, returns the relevant bg and border color
 * */
export default function getCheckboxColor({ state, colorStyles, opts, }: {
    state: InteractionStates;
    colorStyles: {
        borderColor?: string;
        backgroundColor?: string;
    };
    opts?: {
        showByDefault?: boolean;
    };
}): {
    borderColor?: string;
    backgroundColor?: string;
};
