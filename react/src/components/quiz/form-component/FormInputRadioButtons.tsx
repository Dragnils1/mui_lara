import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Select } from "@mui/material";
import { pink } from "@mui/material/colors";
import { height, width } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";

interface CheBoxProps extends Omit<FormInputProps, 'label'> {
    options: string[]
}

const FormInputRadioButton: React.FC<CheBoxProps> = ({
    name,
    control,
    options
}) => {

    return (

        <Controller
            control={control}
            name={name}
            render={
                ({ field: { onChange, value } }) => (
                    <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name={"position_" + value + name}
                        // sx={{
                        //     flexDirection: 'column',
                        //     alignContent: 'flex-start',
                        //     minHeight: '163px',

                        // }}
                        defaultValue="top"
                    >
                        {options.map((option: string) => {
                            return (
                                <FormControlLabel
                                    key={option + name}
                                    value={option ?? ' '}
                                    sx={{
                                        border: ['1px', 'solid', 'rgb(103 38 255)'],
                                        color: 'white',
                                        borderRadius: '5px',
                                        backgroundColor: '#8768c8',
                                        margin: '5px',
                                        width: 'calc(50% - 10px)'
                                    }}
                                    label={option}
                                    labelPlacement="start"
                                    onChange={onChange}
                                    control={<Radio checked={value === option} />}
                                />
                            );
                        })}


                    </RadioGroup>

                )}

        />

    );
};

export default FormInputRadioButton

