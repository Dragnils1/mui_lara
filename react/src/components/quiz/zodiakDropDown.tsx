import { FormInputProps } from "../../types/formInputProps"
import FormInputDropdown from "./form-component/FormInputDropDown"

const ZodiakDropDown = ({ name, control, setValue }: Omit<FormInputProps, 'label'>) => {

    const ZodiakArr = [
        { value: 'Овен' },
        { value: 'Телец' },
        { value: 'Близнецы' },
        { value: 'Рак' },
        { value: 'Лев' },
        { value: 'Дева' },
        { value: 'Весы' },
        { value: 'Скорпион' },
        { value: 'Стрелец' },
        { value: 'Козерог' },
        { value: 'Водолей' },
        { value: 'Рыбы' },
        { value: 'Не знаю' },
    ]


    return (
        <>
            <FormInputDropdown
                name={name} control={control}
                setValue={setValue}
                label="Выберите знак зодиака"
                options={ZodiakArr}
            />
        </>
    )
}



export default ZodiakDropDown

