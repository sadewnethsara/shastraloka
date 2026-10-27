import compactIconsClassic from '../icons/compact/index';
import icons from '../icons/index';
type IconName = keyof typeof icons | keyof typeof compactIconsClassic;
declare const swapOnRtlIconNames: ReadonlyArray<IconName>;
declare const flipOnRtlIconNames: ReadonlyArray<IconName | undefined>;
export { flipOnRtlIconNames, swapOnRtlIconNames };
