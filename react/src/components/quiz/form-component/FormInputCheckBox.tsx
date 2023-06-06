import { Checkbox, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";

interface CheBoxProps extends FormInputProps {
    options: Options[]
}

type Options = { value: string; label?: string }

const FormInputMultiCheckbox: React.FC<CheBoxProps> = ({
    name,
    control,
    setValue,
    label,
    options
}) => {
    const [selectedItems, setSelectedItems] = useState<any>([]);

    const handleSelect = (value: any) => {
        const isPresent = selectedItems.indexOf(value);
        if (isPresent !== -1) {
            const remaining = selectedItems.filter((item: any) => item !== value);
            setSelectedItems(remaining);
        } else {
            setSelectedItems((prevItems: any) => [...prevItems, value]);
        }
    };

    useEffect(() => {
        setValue(name, selectedItems);
    }, [selectedItems]);

    return (
        <FormControl size={"small"} variant={"outlined"}>
            <FormLabel component="legend">{label}</FormLabel>

            <div>
                {options.map((option: Options) => {
                    return (
                        <FormControlLabel
                            control={
                                <Controller
                                    name={name}
                                    render={({ }) => {
                                        return (
                                            <Checkbox
                                                checked={selectedItems.includes(option.value)}
                                                onChange={() => handleSelect(option.value)}
                                            />
                                        );
                                    }}
                                    control={control}
                                />
                            }
                            label={'' && option.label}
                            key={option.value}
                        />
                    );
                })}
            </div>
        </FormControl>
    );
};

export default FormInputMultiCheckbox