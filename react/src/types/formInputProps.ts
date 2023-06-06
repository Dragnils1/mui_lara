import { SxProps, TextFieldProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

export interface FormInputProps {
    name: `${string}` | `${string}.${string}` | `${string}.${number}`;
    control: any;
    label: string;
    setValue?: any;
    rules?: any;
    sx?: SxProps<Theme>
    style?: CSSProperties | undefined
}