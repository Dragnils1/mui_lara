import { FormInputProps } from "../../types/formInputProps"
import FormInputDropdown from "./form-component/FormInputDropDown"

const LangLove = ({ name, control, setValue }: Omit<FormInputProps, 'label'>) => {

    const langLoveArr = [
        { value: 'Крыса' },
        { value: 'Бык' },
        { value: 'Тигр' },
        { value: 'Кролик' },
        { value: 'Дракон' },
        { value: 'Змея' },
        { value: 'Лошадь' },
        { value: 'Коза' },
        { value: 'Обезьяна' },
        { value: 'Петух' },
        { value: 'Собака' },
        { value: 'Кабан' },
        { value: 'Не знаю' },
    ]


    return(
        <>
            <FormInputDropdown 
                name={name} control={control} 
                setValue={setValue} 
                label="Выберите язык любви" 
                options={langLoveArr}
            />
        </>
    )
}



export default LangLove