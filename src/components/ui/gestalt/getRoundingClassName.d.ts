import { Style } from './style';
export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';
export declare const getRoundingStyle: (rounding: Rounding) => Style;
declare const getRoundingClassName: (rounding: Rounding) => string | null | undefined;
export default getRoundingClassName;
