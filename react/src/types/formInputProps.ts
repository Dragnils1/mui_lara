import { SxProps, TextFieldProps, Theme } from "@mui/material";
import { CSSProperties } from "react";
import { Control } from "react-hook-form";

export interface FormInputProps {
    name: `${string}` | `${number}`;
    control: Control<any>;
    label: string;
    input_value?: string;
    setValue?: any;
    rules?: any;
    sx?: SxProps<Theme>
    style?: CSSProperties | undefined
}

// | `${string}.${string}`  | `${string}.${number}` 