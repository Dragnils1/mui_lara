import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import T from "../quiz/OnlyText";
import 'react-alice-carousel/lib/alice-carousel.css';
import { SubmitHandler, useForm } from "react-hook-form";
import ZodiakDropDown from "../quiz/zodiakDropDown";
import FormInputRadioButton from "../quiz/form-component/FormInputRadioButtons";
import LangLove from "../quiz/langLoveDropDown";
import { purple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeFilterObject, filtrationObj } from "../../reducers/cabinetSlice";
import FormInputText from "../quiz/form-component/FormInputText";
import MultipleSelectCheckmarks from "../quiz/form-component/FormMultipleSelectCheckmarks";
import FormMultipleCheckboxList from "../quiz/form-component/FormMultipleCheckboxList";
import { YearsArr, ZodiakArrValues, langLoveArrValues } from "../../static/cabinet_variables";
import FormRangeSlider from "../quiz/form-component/FormRangeSlider";

const Filtration: FC = () => {


    const dispatch = useAppDispatch()

    const Region = ['01', '02,102', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16,116', '17', '18', '19', '95', '21', '22', '23,93', '24', '25,125', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50,90,150', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63,163', '64', '65', '66,96', '67', '68', '69', '70', '71', '72', '73', '74,174', '75', '76', '77,97,99,177', '78,98', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89'];
    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm<filtrationObj>();
    const [params, setParams] = useState('')

    const { user: {profile_actions} } = useAppSelector(state => state.auth)

    console.log(profile_actions);
    
    

    const reset = () => dispatch(changeFilterObject(''))
    // const reset = () => dispatch(changeFilterObject({} as filtrationObj))


    const onSubmit: SubmitHandler<filtrationObj> = (data) => {

        console.log(data);


       Object.entries(data).forEach(([key, value]) => {
        value && !params.includes(value) && setParams(params + `&${key}=${value}`)
       })


        dispatch(changeFilterObject(params))
    };


    return (
        <Box >
        <form onSubmit={handleSubmit(onSubmit)} >
            <T>Регион поиска: </T>
            <MultipleSelectCheckmarks name="region" label={'Регион поиска'}
                control={control} names_array={Region} />


            {/* <T>Выберите год рождения: </T>
            <div>
                <input type="range" id="volume" {...register('birthday')}
                    min={1950} max={new Date().getFullYear() - 18} />
                    <label htmlFor="volume">Volume</label>
            </div> */}


            <T>Выберите диапозон возрастов: </T>
            <FormRangeSlider control={control} label='Выберите диапозон возрастов'
                name="birthday" defaultArrayValue={[1930, new Date().getFullYear()]}/>

            <T>Выберите диапозон веса (в кг): </T>
            <FormRangeSlider control={control} label='Выберите диапозон веса'
                name="birthday" defaultArrayValue={[20, 200]}/>

            <T>Выберите диапозон роста (в см): </T>
            <FormRangeSlider control={control} label='Выберите диапозон роста'
                name="birthday" defaultArrayValue={[50, 300]}/>

            <T>Года, которые вы бы не хотели видеть: </T>
            <MultipleSelectCheckmarks name="not_birthday" label={'Исключите года'}
                control={control} names_array={YearsArr} />




            <T>Знак зодиака по восточной астрологии: </T>
            <MultipleSelectCheckmarks name="birthyear" label={'Знак зодиака по восточной астрологии'}
                control={control} names_array={langLoveArrValues} />

            <T>
                Знак зодиака по западной астрологии:
            </T>
            <MultipleSelectCheckmarks name="zodiak" label={'Знак зодиака по западной астрологии'}
                control={control} names_array={ZodiakArrValues} />

            <T>
                Основной язык любви
            </T>
            <FormMultipleCheckboxList
                control={control} name='langlove'
                names_array={['Одобрение', 'Прикосновения', 'Время', 'Помощь', 'Подарки',]}
            />
            <T>
                Второстепенный язык любви
            </T>
            <FormMultipleCheckboxList
                control={control} name='langlove2'
                names_array={['Одобрение', 'Прикосновения', 'Время', 'Помощь', 'Подарки',]}
            />
            <T>Вид поиска</T>
            <FormMultipleCheckboxList
                control={control} name='targetsearch'
                names_array={['Активный', 'Пассивный', 'Консультация', 'Встреча']}
            />

            <Button type="submit" variant="contained"
                sx={{ marginLeft: '5%', bgcolor: purple[600] }} >Применить фильтры</Button>
            <Button type="submit" variant="contained" onClick={() => reset()}
                sx={{ marginLeft: '5%', bgcolor: purple[600] }} >Сбросить фильтры</Button>



        </form>
        </Box>
    )
}

export default Filtration
