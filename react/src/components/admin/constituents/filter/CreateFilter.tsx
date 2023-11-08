import { FormLabel, Typography } from "@mui/material";
import T from "../../../quiz/OnlyText";
import StyledForm from "../../../forAll/StyledForm";
import FormInputText from "../../../quiz/form-component/FormInputText";
import FormInputDropdown from "../../../quiz/form-component/FormInputDropDown";
import { useForm } from "react-hook-form";
import { CreateFilterType } from "../../../../types/filter";



const CreateFilter = () => {

    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm<CreateFilterType>();


    return (
        <>
            <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                Добавить новый фильтр
            </Typography>

            <StyledForm>
                <T>Название фильтра </T>
                <FormLabel>Название фильтра</FormLabel>
                <FormLabel>Тип фильтра</FormLabel>
                <FormLabel>Значение по умолчанию</FormLabel>


                <FormInputText
                    control={control}
                    name="filter_name"
                    label="Название фильтра"
                />
                <FormInputDropdown 
                    control={control}
                    label="Тип фильтра"
                    name="filter_type"
                    options={[]}
                />
            </StyledForm>
        </>
    );
};

export default CreateFilter;
