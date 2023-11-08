import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";

interface FormRangeSliderInterface extends FormInputProps {
    defaultArrayValue: [number, number];
}

const FormRangeSlider = ({
    name,
    control,
    label,
    rules,
    defaultArrayValue = [
        new Date().getFullYear() - 1,
        new Date().getFullYear(),
    ],
}: FormRangeSliderInterface) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <Box sx={{ width: 300 }}>
                    <Slider
                        getAriaLabel={() => label}
                        value={value ?? defaultArrayValue}
                        valueLabelDisplay="on"
                        onChange={onChange}
                        min={defaultArrayValue[0]}
                        max={defaultArrayValue[1]}
                        // getAriaValueText={valuetext}
                    />
                </Box>
            )}
            rules={{} && rules}
        />
    );
};
export default FormRangeSlider;
