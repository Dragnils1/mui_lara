import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types/formInputProps";


const Pass = ({ control, rules }: Omit<FormInputProps, 'label' | "name">) => {
    return (
        <Controller
            name={'password'}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value ?? ""}
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...rules}
                />
            )}
        />
    );
};
export default Pass