import { Box, Button } from "@mui/material";
import { FC } from "react";
import T from "../quiz/OnlyText";
import 'react-alice-carousel/lib/alice-carousel.css';
import { SubmitHandler, useForm } from "react-hook-form";
import ZodiakDropDown from "../quiz/zodiakDropDown";
import FormInputRadioButton from "../quiz/form-component/FormInputRadioButtons";
import LangLove from "../quiz/langLoveDropDown";
import { purple } from "@mui/material/colors";
import { useAppDispatch } from "../../hooks/hooks";
import { changeFilterObject, filtrationObj } from "../../reducers/cabinetSlice";
import FormInputText from "../quiz/form-component/FormInputText";

const Filtration: FC = () => {

    
    const dispatch = useAppDispatch()

    const Region = ['01', '02,102', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16,116', '17', '18', '19', '95', '21', '22', '23,93', '24', '25,125', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50,90,150', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63,163', '64', '65', '66,96', '67', '68', '69', '70', '71', '72', '73', '74,174', '75', '76', '77,97,99,177', '78,98', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89'];
    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm<filtrationObj>();
    
    const reset = () => dispatch(changeFilterObject({} as filtrationObj))
    const onSubmit: SubmitHandler<filtrationObj> = (data) => {
        
        dispatch(changeFilterObject(data))
    };
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <T>Регион поиска: </T>
            <Box >
                {Region.map((elem) => (
                    <div  style={{ width: 'auto', display: 'inline-block' }}>
                        <div className="filter__p-3">{elem}</div>
                        <input type="checkbox" className="mycheck langlove_check" onChange={() => setValue('city', elem)} name="region" />
                        <div className="check_active" style={{ position: 'absolute', right: 0 }}></div>
                    </div>
                ))}
            </Box>
            
            {/* <T>Выберите год рождения: </T>
            <div>
                <input type="range" id="volume" {...register('birthday')}
                    min={1950} max={new Date().getFullYear() - 18} />
                    <label htmlFor="volume">Volume</label>
            </div> */}

        
            <T>Выберите диапозон возрастов: </T>
            <FormInputText control={control} label='От какого года' name="birthday" />
            <FormInputText control={control} label='До какого года' name="registermonth" />
        

        

            <T>Знак зодиака по восточной астрологии: </T>
            <LangLove name="birthyear" control={control} setValue={setValue} />
            <T>
                Знак зодиака по западной астрологии
            </T>
            <ZodiakDropDown name="zodiak" control={control} setValue={setValue} />
            <T>
                Основной язык любви
            </T>
            <FormInputRadioButton
                control={control} name='langlove'
                options={['Одобрение', 'Прикосновения', 'Время', 'Помощь', 'Подарки',]}
            />
            <T>
                Второстепенный язык любви
            </T>
            <FormInputRadioButton
                control={control} name='langlove2'
                options={['Одобрение', 'Прикосновения', 'Время', 'Помощь', 'Подарки',]}
            />
            <T>Вид поиска</T>
            <FormInputRadioButton
                control={control}
                name='targetsearch'
                options={['Активный', 'Пассивный', 'Консультация', 'Встреча']}
            />

            <Button type="submit" variant="contained"
                sx={{ marginLeft: '5%', bgcolor: purple[600] }} >Применить фильтры</Button>
            <Button type="submit" variant="contained" onClick={() => reset()}
                sx={{ marginLeft: '5%', bgcolor: purple[600] }} >Сбросить фильтры</Button>



        </form>
    )
}

export default Filtration