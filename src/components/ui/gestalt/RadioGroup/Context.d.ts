type RadioGroupContextType = {
    parentName: string;
};
declare const RadioGroupContextProvider: import("react").Provider<RadioGroupContextType>;
declare function useRadioGroupContext(): RadioGroupContextType;
export { RadioGroupContextProvider, useRadioGroupContext };
