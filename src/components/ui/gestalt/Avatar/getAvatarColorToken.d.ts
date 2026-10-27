interface ColorToken {
    base: string;
    hover: string;
    pressed: string;
}
interface ColorTokens {
    [key: string]: ColorToken;
}
declare const colorTokensLight: ColorTokens;
declare const colorTokensDark: ColorTokens;
type BackgroundColorLight = keyof typeof colorTokensLight;
type BackgroundColorDark = keyof typeof colorTokensDark;
type GetAvatarColorToken = (color: BackgroundColorLight | BackgroundColorDark, isHovered?: boolean, isPressed?: boolean, isDarkMode?: boolean) => string;
declare const getAvatarColorToken: GetAvatarColorToken;
export default getAvatarColorToken;
