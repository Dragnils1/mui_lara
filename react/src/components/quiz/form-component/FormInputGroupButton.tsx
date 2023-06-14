import { Checkbox, FormControlLabel, FormGroup, Select } from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";

interface CheBoxProps extends Omit<FormInputProps, 'label'> {
    options: string[]
}

const FormInputGroupButton: React.FC<CheBoxProps> = ({
    name,
    control,
    options
}) => {
    const generateSingleOptions = () => {
        return
    };

    return (

            <Controller
                control={control}
                name={name}
                render={
                    ({ field: { onChange, value } }) => (
                        <FormGroup aria-label="position" row>
                                {options.map((option: string) => {
                                    return (
                                        < FormControlLabel
                                            key={option}
                                            value={option ?? ' '}
                                            control={< Checkbox />}
                                            sx={{ border: ['1px', 'solid', pink[300]] }}
                                            label={option}
                                            labelPlacement="start"
                                            onChange={onChange}
                                            // value={value ?? ' '}
                                        />
                                        );
                                })}
                        </FormGroup>
                )}

            />

    );
};

export default FormInputGroupButton

