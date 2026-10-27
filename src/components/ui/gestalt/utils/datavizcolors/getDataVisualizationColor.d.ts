/** Gets the relevant dataviz color from a code. We use the color hex to generate a shade. Data visualization colors are a part of theme tokens */
export default function getDataVisualizationColor(theme: 'lightMode' | 'darkMode', vizColor: string, opts?: {
    lighten?: boolean;
}): string;
