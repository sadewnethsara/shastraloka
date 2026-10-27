import { ReactNode } from 'react';
type DeviceType = 'desktop' | 'mobile';
type Props = {
    children: ReactNode;
    /**
     * The device type as determined by logic within your app.
     */
    deviceType: DeviceType;
};
/**
 * [DeviceTypeProvider](https://gestalt.pinterest.systems/web/utilities/devicetypeprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to enable device-specific UI for Gestalt components that support it.
 */
export default function DeviceTypeProvider({ children, deviceType }: Props): import("react/jsx-runtime").JSX.Element;
export declare function useDeviceType(): DeviceType;
export {};
