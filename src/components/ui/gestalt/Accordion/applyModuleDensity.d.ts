import { ComponentProps } from 'react';
import Box from '../Box';
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
declare const applyModuleDensityStyle: (size: "sm" | "md" | "lg") => {
    gap: Gap;
    padding: Gap;
    rounding: ComponentProps<typeof Box>["rounding"];
    titleGap: Gap;
    summaryListGap: Gap;
};
export default applyModuleDensityStyle;
