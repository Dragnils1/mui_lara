import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";

interface CheBoxProps extends FormInputProps {
    options: Options[]
}

type Options = { value: string; label?: string }

const FormInputDropdown: React.FC<CheBoxProps> = ({
    name,
    control,
    label,
    options
}) => {
    const generateSingleOptions = () => {
        return options.map((option: Options) => {
            return (
                <MenuItem key={option.value} value={option.value ?? ''}>
                    {option.label ?? option.value}
                </MenuItem>
            );
        });
    };

    return (
        <FormControl fullWidth size={"small"}>
            <InputLabel>{label}</InputLabel>
            <Controller
                render={({ field: { onChange, value } }) => {
                    
                    return (
                        <Select onChange={onChange} value={options.some(el => {
                            return el.value === value
                        }) ? value : '' } >
                            {generateSingleOptions()}
                        </Select>
                    )
                    
                }}
                control={control}
                name={name}
            />
        </FormControl>
    );
};

export default FormInputDropdown