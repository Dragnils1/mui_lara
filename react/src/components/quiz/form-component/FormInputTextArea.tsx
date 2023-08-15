import { TextareaAutosize } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../../../types/formInputProps";


const FormInputTextAria = ({ name, control, label, style }: FormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder={label}
                    onChange={onChange}
                    minRows={3}
                    value={value ?? ''}
                    style={{
                        fontSize: '15px',
                        margin: '0 2%',
                        width: '95%',
                        ...style
                    }}
                    
                />
            )}
        />
    );
};
export default FormInputTextAria