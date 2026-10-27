import { Style } from './style';
export type Functor<T> = (n: T) => Style;
export declare const toggle: (...classNames: ReadonlyArray<string>) => ((val?: boolean) => Style);
export declare const mapping: (map: {
    [key: string]: string;
}) => ((val: string) => Style);
export declare const range: (scale: string) => ((n: number) => Style);
export declare const rangeWithZero: (scale: string) => ((n: number) => Style);
export declare function bind<T>(fn: Functor<T>, scope: {
    readonly [key: string]: string;
}): (val: T) => Style;
export declare const union: <T>(...fns: ReadonlyArray<Functor<T>>) => ((val: T) => Style);
