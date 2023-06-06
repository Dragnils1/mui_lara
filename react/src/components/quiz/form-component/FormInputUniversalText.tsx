import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormInputProps } from '../../../types/formInputProps';

// 👇 Styled Material UI TextField Component
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#5e5b5d',
        fontWeight: 400,
    },
    '& .MuiInputBase-input': {
        borderColor: '#c8d0d4',
    },
    '& .MuiInput-underline:after': {
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-error': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d32f2f',
            },
        },
        '& fieldset': {
            borderColor: '#c8d0d4',
            borderRadius: 0,
        },
        '&:hover fieldset': {
            border: '1px solid #c8d0d4',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #c8d0d4',
        },
    },
});

// 👇 Type of Props the FormInput will receive


export const FormInputUniversalText = ({ name, control, label, rules, ...otherProps }: FormInputProps & TextFieldProps) => {
    // 👇 Utilizing useFormContext to have access to the form Context

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=''
            render={({ field }) => (
                <CssTextField
                    {...field}
                    {...otherProps}
                    label={label}
                    variant='outlined'
                    sx={{ mb: '1.5rem' }}
                />
            )}

            rules={{} && rules}
        />
    );
};