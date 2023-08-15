import React from "react";

import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
// import ReactInputMask from "react-input-mask";
import { FormInputProps } from "../../../types/formInputProps";
const DATE_FORMAT = "дд.мм.гггг";

const FormInputDate = ({ name, control, label }: FormInputProps) => {

    const checkANdRestrictDate = (date: string) => {

        return date ? (date.includes('.') ? date.split('.').reverse().join('-') : date) : ''
    }

    return (
        <>

            <Controller
                name={name}
                control={control}
                render={({ field }) => {

                    // console.log(field.value);
                    
                    
                    return (
                    
                    // window.screen.width > 777 ?
                        <TextField
                            label={label}
                            type="date"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={checkANdRestrictDate(field.value)}
                            placeholder={DATE_FORMAT}
                            onChange={field.onChange}
                        /> 
                        // :
                        // <ReactInputMask
                        //     mask="99.99.9999"
                        //     value={field.value ?? ''}
                        //     placeholder={DATE_FORMAT}
                        //     onChange={field.onChange}
                        // >
                        // </ReactInputMask>
                    
                )}}

            />
        </>
    );
};

export default FormInputDate