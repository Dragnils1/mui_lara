import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import { useMask } from 'react-mask-field';
import { FormInputProps } from "../../../types/formInputProps";


const FormInputReactMask = ({ name, control, rules }: Omit<FormInputProps, 'label'>) => {

    const ref = useMask({ mask: '_ (___) ___-__-__', replacement: { _: /\d/ } });

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{
                ...rules
            }}
            render={({ field }) => (

                <input  {...field}  ref={ref} style={{
                        width: '98%',
                        height: '30px',
                        border: '1px solid rgb(103 38 255)',
                        color: "black",
                    }}
                    placeholder="Например, 89506142432"  />
            )}

        />

    );
};
export default FormInputReactMask
