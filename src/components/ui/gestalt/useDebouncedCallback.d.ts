/**
 * Hook to debounce a particular function from being called until after a given
 * wait period. An important bit is that we clear the timeout when the component
 * unmounts. That way, we avoid React state updates on unmounted components which
 * result in a warning. See https://stackoverflow.com/a/60907638/117193 for more info
 */
export default function useDebouncedCallback(callback: () => void, wait: number): () => void;
