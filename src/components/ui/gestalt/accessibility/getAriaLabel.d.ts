export default function getAriaLabel({ accessibilityLabel, accessibilityNewTabLabel, target, }: {
    accessibilityLabel?: string;
    accessibilityNewTabLabel: string;
    target?: null | 'self' | 'blank';
}): string | undefined;
