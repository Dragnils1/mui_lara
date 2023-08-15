import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../types/formInputProps";


const Email = ({ control, rules }: Omit<FormInputProps, 'label' | "name">) => {
    return (
        <Controller
            name={'email'}
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
                    id="email"
                    label="Email Address"
                    name="email"
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value ?? ""}
                    variant="outlined"
                    {...rules}

                />
            )}
        />
    );
};
export default Email