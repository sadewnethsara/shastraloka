import icons from './icons/index';
export type IconColor = 'default' | 'disabled' | 'subtle' | 'success' | 'error' | 'warning' | 'info' | 'recommendation' | 'inverse' | 'shopping' | 'brandPrimary' | 'light' | 'dark';
type Props = {
    /**
     * Label for screen readers to announce Icon. This populates the `aria-label` attribute. If the label is hidden, use an empty string for the label (`accessibilityLabel=""`) to set `aria-hidden`.
     *
     * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/icon#Accessibility) for details on proper usage.
     */
    accessibilityLabel: string;
    /**
     * The colors available to apply to Icon.
     *
     * See the [color variant](https://gestalt.pinterest.systems/web/icon#Colors) to learn more.
     */
    color?: IconColor;
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * SVG icon from the Gestalt icon library to use within Icon.
     *
     * See the [icon library](http://pinch.pinadmin.com/iconLibrary) to explore available options.
     */
    icon?: keyof typeof icons;
    /**
     * Defines a new icon different from the built-in Gestalt icons.
     *
     * See the [custom icon](https://gestalt.pinterest.systems/web/icon#Custom-icon) variant to learn more.
     */
    dangerouslySetSvgPath?: {
        __path: string;
    };
    /**
     * Properly positions Icon relative to an inline element, such as Text using the inline property.
     */
    inline?: boolean;
    /**
     * Use a number for pixel sizes or a string for percentage based sizes.
     *
     * See the [size](https://gestalt.pinterest.systems/web/icon#Size) variant to learn more.
     */
    size?: number | string;
};
/**
 * [Icons](https://gestalt.pinterest.systems/web/icon) are the symbolic representation of an action or information, providing visual context and improving usability.
 *
 * See the [Iconography and SVG guidelines](http://pinch.pinadmin.com/iconLibrary) to explore the full icon library.
 *
 * ![Icon light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list.spec.ts-snapshots/Icon-list-chromium-darwin.png)
 * ![Icon dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list-dark.spec.ts-snapshots/Icon-list-dark-chromium-darwin.png)
 *
 */
declare function Icon({ accessibilityLabel, color, dangerouslySetSvgPath, dataTestId, icon, inline, size, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Icon {
    var icons: readonly ("shrink" | "circle" | "filter" | "replace" | "search" | "bold" | "italics" | "link" | "color" | "code" | "menu" | "select" | "table" | "template" | "animate" | "text" | "key" | "security" | "alert" | "timer" | "send" | "location" | "pen" | "blur" | "cancel" | "pause" | "play" | "remove" | "360" | "3d" | "3d-move" | "accessibility" | "ad" | "ad-group" | "add" | "add-circle" | "add-layout" | "add-pin" | "add-section" | "ads-overview" | "ads-stats" | "align-bottom" | "align-bottom-center" | "align-bottom-left" | "align-bottom-right" | "align-middle" | "align-top" | "align-top-center" | "align-top-left" | "align-top-right" | "alphabetical" | "amazon" | "android-share" | "angled-pin" | "api" | "apple" | "apps" | "ar-try-on" | "arrow-back" | "arrow-circle-back" | "arrow-circle-down" | "arrow-circle-forward" | "arrow-circle-up" | "arrow-counter-clockwise" | "arrow-double-back" | "arrow-double-forward" | "arrow-down" | "arrow-end" | "arrow-forward" | "arrow-left-curved" | "arrow-nested" | "arrow-start" | "arrow-up" | "arrow-up-left" | "arrow-up-right" | "arrows-vertical" | "aspect-ratio" | "audio-bars" | "audio-mix" | "audio-playing" | "bell" | "bell-fill" | "birthday-cake" | "board" | "board-sticker-large" | "board-sticker-small" | "border" | "border-shadow" | "briefcase" | "building-business" | "business-hierarchy" | "calendar" | "calendar-check" | "camera" | "camera-flip" | "camera-roll" | "canonical-pin" | "captions" | "captions-outline" | "card-stack" | "card-stack-refresh" | "check" | "check-circle" | "check-circle-fill" | "chevron-down-circle" | "chevron-left-circle" | "chevron-right-circle" | "chevron-up-circle" | "circle-ellipsis" | "circle-information-fill" | "circle-initializing" | "clear" | "clipboard" | "clips" | "clock" | "clock-checked" | "cloud-server" | "code-check" | "cog" | "cog-fill" | "collage" | "collapse" | "color-palette" | "color-picker" | "color-solid" | "color-split" | "compass" | "compass-fill" | "compose" | "contrast" | "conversion-tag" | "copy-to-clipboard" | "credit-card" | "credit-card-plus" | "crop" | "crystal-ball" | "cutout" | "dash" | "data-source" | "deselect" | "design" | "desktop" | "diagnostics" | "directional-arrow-left" | "directional-arrow-right" | "download" | "drag-drop" | "draw" | "dropbox" | "duplicate" | "edit" | "ellipsis" | "envelope" | "erase" | "erase-auto" | "etsy" | "expand" | "eye" | "eye-hide" | "face-happy" | "face-neutral" | "face-sad" | "face-smiley" | "face-smiley-outline" | "face-smiley-plus" | "face-tryon" | "facebook" | "fade" | "ferris-wheel" | "file-box" | "file-unknown" | "fill-opaque" | "fill-transparent" | "flag" | "flame" | "flash" | "flash-automatic" | "flash-slash" | "flashlight" | "flip-horizontal" | "flip-vertical" | "folder" | "folder-fill" | "forward" | "gauge" | "ghost" | "ghost-fill" | "gif" | "gif-visual" | "gift" | "globe" | "globe-checked" | "gmail" | "graph-bar" | "graph-pie" | "hand" | "hand-pointing" | "handle" | "heart" | "heart-broken" | "heart-health" | "heart-outline" | "highlights" | "history" | "home" | "home-fill" | "idea-pin" | "image-portrait" | "imessage" | "impressum" | "indent" | "info-circle" | "information" | "insights-audience" | "insights-conversion" | "instagram" | "instagram-stories" | "invoice" | "kakao-talk" | "knoop" | "lab-flask" | "lasso-magic" | "layers-stack" | "layout" | "lightbulb" | "lightning-bolt-circle" | "link-broken" | "lips" | "list-bullets" | "list-numbered" | "list-numbered-rtl" | "lock" | "logo-large" | "logo-small" | "logout" | "magic-pen" | "magic-wand" | "magnifying-glass-sparkle" | "manage-access" | "margins-large" | "margins-medium" | "margins-small" | "maximize" | "megaphone" | "messenger" | "microphone" | "minimize" | "mobile" | "moon" | "move-pin" | "music-off" | "music-on" | "mute" | "mute-fill" | "orientation-landscape" | "orientation-portrait" | "outdent" | "outlook" | "overlay-text" | "overlay-text-outline" | "overview" | "paper-clip" | "paper-lines-plus" | "pen-auto" | "people" | "performance-plus" | "person" | "person-add" | "person-fill" | "person-magnifying-glass" | "phone" | "pin" | "pin-hide" | "pincode" | "pinterest" | "protect" | "qr-code" | "question-mark" | "quote" | "record-limit" | "record-limit-10" | "record-limit-15" | "record-limit-30" | "record-limit-5" | "record-limit-60" | "redo" | "refresh" | "reorder-images" | "report" | "rewind" | "ribbon" | "rocketship" | "rotate" | "saturation" | "save-outline" | "saved" | "scale" | "scissors" | "search-by-image" | "search-fill" | "shadows" | "shapes" | "share" | "shopping-bag" | "shopping-bag-fill" | "shuffles" | "skintone" | "slide" | "smiley" | "snapchat" | "sort-ascending" | "sort-descending" | "sound" | "sound-fill" | "sound-slash" | "sound-slash-fill" | "sparkle" | "speech" | "speech-ellipsis" | "speech-ellipsis-fill" | "speech-exclamation-point" | "speech-heart" | "speech-outline" | "speed" | "speed-.3x" | "speed-.5x" | "speed-1x" | "speed-2x" | "speed-3x" | "spread" | "square-plus" | "square-plus-fill" | "star" | "star-half" | "star-outline" | "sticker" | "sticker-image" | "sun" | "swap" | "switch-account" | "tag" | "tag-star" | "target" | "telegram" | "terms" | "text-align-center" | "text-align-left" | "text-align-right" | "text-all-caps" | "text-extra-small" | "text-invert" | "text-large" | "text-line-height" | "text-medium" | "text-sentence-case" | "text-size" | "text-small" | "text-spacing" | "text-sticker" | "threads" | "thumbs-down" | "thumbs-up" | "timer-10" | "timer-3" | "tint" | "trash-can" | "trending" | "underline" | "undo" | "unlock" | "upload-feed" | "viber" | "vibrance" | "video-advance-10-seconds" | "video-camera" | "video-rewind-10-seconds" | "view-type-default" | "view-type-default-fill" | "view-type-dense" | "view-type-list" | "view-type-sparse" | "visit" | "warmth" | "wave" | "whatsapp" | "wifi-no" | "workflow-status-all" | "workflow-status-canceled" | "workflow-status-halted" | "workflow-status-in-progress" | "workflow-status-ok" | "workflow-status-problem" | "workflow-status-queued" | "workflow-status-unstarted" | "workflow-status-warning" | "x-social" | "yahoo" | "youtube")[];
    var displayName: string;
}
export default Icon;
