import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";


const FormInputText = ({ name, control, label, rules, sx, input_value = " " }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    sx={sx}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value ?? input_value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    
                />
            )}
            rules={{} && rules}
        />
    );
};
export default FormInputText