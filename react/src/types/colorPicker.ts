export interface HSLColor {
    a?: number | undefined;
    h: number;
    l: number;
    s: number;
}

export interface RGBColor {
    a?: number | undefined;
    b: number;
    g: number;
    r: number;
}

export type Color = string | HSLColor | RGBColor;

export interface ColorResult {
    hex: string;
    hsl: HSLColor;
    rgb: RGBColor;
}

export type ColorChangeHandler = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => void;