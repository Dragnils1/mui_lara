import React, { useEffect } from "react";
import Slider from '@mui/material/Slider';
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";


export const FormInputSlider = ({ name, control, setValue, label }: FormInputProps) => {
    const [sliderValue, setSliderValue] = React.useState(0);

    useEffect(() => {
        if (sliderValue) setValue(name, sliderValue);
    }, [sliderValue]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    return <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
            <Slider
                value={sliderValue}
                onChange={handleChange}
            />
        )}
    />
};