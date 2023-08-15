import { Box, Button, Card, CardActionArea, CardContent, CardMedia,  TextField, Typography } from "@mui/material";
import { forwardRef, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { increment, decrement } from "../reducers/quizSlice";
import  { ReactInputMask } from 'react-input-mask';
import {  Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { QuizType } from "../types/quiz";
import LangLove from "./quiz/langLoveDropDown";
import FormInputText from "./quiz/form-component/FormInputText";
import FormInputDropdown from "./quiz/form-component/FormInputDropDown";
import FormInputTextAria from "./quiz/form-component/FormInputTextArea";
import T from "./quiz/OnlyText";
import FormInputReactMask from "./quiz/form-component/FormInputReactMask";
import React from "react";
import { useSnackbar } from "notistack";
import FormInputRadioButton from "./quiz/form-component/FormInputRadioButtons";
import FormInputDate from "./quiz/form-component/FormInputDate";
import { useSubmitDataMutation, useUpdateDataMutation } from "../services/goroskop";
import { purple, red } from "@mui/material/colors";
import { styled } from "@mui/system";
import ScrollDialog from "./quiz/Dialog";
import Pass from "./quiz/Pass";
import Email from "./quiz/Email";
import { Link } from "react-router-dom";
import {FormInputUniversalText} from "./quiz/form-component/FormInputUniversalText";
import ZodiakDropDown from "./quiz/zodiakDropDown";
import { AuthState, changeUser } from "../reducers/authSlice";
import { Person } from "../types/person";

interface ImmageArr {
    o_img1: string | null;
    o_img2: string | null;
    o_img3: string | null;
    o_img4: string | null
}

const Form = styled('form')({
    // border: '1px dashed grey',
    textAlign: 'center',
    // width: '800px',
    backgroundColor: 'white',
    minHeight: "700px",
    borderRadius: '10px',
    '& > div': {
        border: '1px solid rgb(80, 61, 122)',
        borderRadius: '8px',
        // margin: '0 2%',
        // width: '95%'
    },
    '& > div > label.MuiFormLabel-filled': {
        display: 'none'
    },
    '& > div > label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root': {
        display: 'none'
    },

});


const elementsForDelete:
    Array<keyof  Pick<QuizType, 'o_img1' | 'o_img2' | 'o_img3' | 'o_img4'>> = ['o_img1', 'o_img2', 'o_img3', 'o_img4']
const email = Date.now() + Math.random()

const Quiz = ({ quizRef }: { quizRef?: ((instance: unknown) => void) | React.MutableRefObject<unknown> | null }) => {

   const [imageArr, setImageArr] = useState<ImmageArr>({
        o_img1: null,
        o_img2: null,
        o_img3: null,
        o_img4: null
    })
    const [imageNameArr, setimageNameArr] = useState<string[]>([])
    const newString = Object.values(imageArr)

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [submitData, {data, error}] = useSubmitDataMutation()
    const [updateData, updateResult] = useUpdateDataMutation()

    const { value } = useAppSelector(state => state.quiz)
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm<QuizType>({defaultValues: {
        fav: "",
        fav_date: "",
        fav_modify: "",
        color: "",
        comp: "[]",
        firstname: "",
        gender: "М",
        city: "",
        birthday: "",
        birthyear: "",
        zodiak: "",
        langlove: "",
        langlove2: "",
        familystatus: "",
        phone: "",
        vk: "",
        helptext: "",
        targetsearch: "",
        targetsearchtext: "",
        about: "",
        height: "",
        weight: "",
        inst: "",
        fb: "",
        ok: "",
        email: "",
        password: "",
        dateofend: "",
        source: "",
        source_type: "Квиз",
        images: "",
        o_img1: "",
        o_img2: "",
        o_img3: "",
        o_img4: "",
        registermonth: "",
        smoke: "",
        children: "нет",
        birthdaychild1: "",
        birthdaychild2: "",
        birthdaychild3: "",
        birthdaychild4: "",
        lastlove: "",
        lastzodiak: "",
        defer: "0",
        report: "",
        politic: false,
        vip: "0",
    }});

    console.log(data, user)

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit: SubmitHandler<QuizType> = dataQuiz => {


        let newdataQuiz = dataQuiz
        let fd = new FormData()


        if (value > 6 && value < 22) {
            newdataQuiz.color = 'red'
        } else if (value === 22) {
            newdataQuiz.color = 'yellow'
        } else  {
            newdataQuiz.color = 'white'
        }

        dataQuiz.images = ['','','',''].join()

        elementsForDelete.forEach(el => {

            if(dataQuiz[el]) {
                fd.append(el, dataQuiz[el])
            }

            delete newdataQuiz[el]

        })


        fd.append('profile', JSON.stringify(newdataQuiz))

        if (value === 7) {
            submitData({name: 'profile', data: fd}).unwrap()
                .then((res) =>
                    dispatch(changeUser({user: (res as any)?.user as Person}))
                )

        } else {
            fd.append("_method", "PUT");
            submitData({name: `profile/${user.id}`, data: fd})
        }



        if (error) {
            console.log(error);
        }

        if (data === 'ok') {
            enqueueSnackbar('Выша заявка успешно отправлена', {
                variant: 'success',
            })
        }



    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // let fd = new FormData()

        // const file = e.target.files ? e.target.files[0] : 'null'

        imageNameArr[Object.keys(imageArr).indexOf(e.target.name)] = e.target.files ? e.target.files[0].name : 'null'

        const fR = new FileReader()

        e.target.files && fR.readAsDataURL(e.target.files[0])

        fR.onloadend = () => {
            setImageArr({ ...imageArr, [e.target.name]: fR.result })
        }

        setValue('images', imageNameArr.join(','))

        // fd.append(e.target.name, file)
        // fd.append('user_email', email.toString())
        // fd.append('images', imageNameArr.join(','))

        // submitData({ name: 'updatePhoto.php', data: fd })
        //     .finally(() => {
        //         enqueueSnackbar('Картинка изменена', {
        //             variant: 'info',
        //         });
        //     })

    }

    const deleteImage = (nameImg: number) => {
        setImageArr({ ...imageArr, [Object.keys(imageArr)[nameImg]]: null })
        newString[nameImg] =  null
    }

    const renderForm = () => {

        switch (value) {
            case 0:
                return (
                    <>
                        <T>Ваше имя и фамилия в соответствии с Vkontakte</T>
                        <FormInputText
                            control={control} name='firstname' label="Имя и фамилия"
                        />
                        <T>Выберите Ваш пол</T>
                        <FormInputDropdown
                            control={control} name='gender' label="Выберите пол"
                            options={[{ value: 'М' }, { value: 'Ж' }]}
                        />
                        <T>Введите код регионa. Если Вы не занете код Вашего региона нажмите:</T>
                        <ScrollDialog >
                            <CardMedia
                                component="img"
                                height="90%"
                                image={`/images/region_code.jpg`}
                                alt={'Код региона Россия'}
                            />
                        </ScrollDialog>
                        <FormInputText
                            control={control} name='city' label="Введите код регионa"
                        />
                    </>
                )
            case 1:
                return(
                    <>
                        <T>Дата вашег рожждения?</T>
                        <FormInputDate control={control} label='Дата рождения' name="birthday"  />

                    </>

                )
            case 2:
                return(
                    <>
                        <T>
                            В год какого животного вы родились?
                            Если вы не знаете в год какого животного вы родились,
                            то дата начала и конец вашего года указаны :
                        </T>
                        <ScrollDialog >
                            <CardMedia
                                component="img"
                                height="90%"
                                image={`/images/anim_year.jpg`}
                                alt={'Знаки зодиака по дате'}
                            />
                        </ScrollDialog>
                        <LangLove name="birthyear" control={control} setValue={setValue} />

                    </>
                )
            case 3:
                return (
                    <>
                        <T>
                            Кто вы по знаку зодиака? Если не знаете свой знак зодиака,
                            то посмотрите подсказку:
                        </T>
                        <ScrollDialog >
                            <CardMedia
                                component="img"
                                height="90%"
                                image={`/images/zodiak_year.jpg`}
                                alt={'Знаки зодиака по дате'}
                            />
                        </ScrollDialog>
                        <ZodiakDropDown name="zodiak" control={control} setValue={setValue} />
                    </>

                )
            case 4:
                return (
                    <>
                        <T>Выберете пожалуйста 2-а своих психологических языка любви.
                            Это то, как вы понимаете, что вас любят,
                            и вы готовы так же выражать свою любовь.
                            Языки любви посмотреть:
                        </T>
                        <ScrollDialog >
                            <CardMedia
                                component="img"
                                height="90%"
                                image={`/images/lang_love.jpg`}
                                alt={'Знаки зодиака по дате'}
                            />
                        </ScrollDialog>
                        <T>
                            Первый знак:
                        </T>
                        <FormInputRadioButton
                            control={control} name='langlove'
                            options={['Одобрение', 'Прикосновения', 'Время', 'Помощь', 'Подарки', ]}
                        />
                        <T>
                            Второстепенный язык:
                        </T>
                        <FormInputRadioButton
                            control={control} name='langlove2'
                            options={['Одобрение', 'Прикосновения', 'Время', 'Помощь', 'Подарки',]}
                        />

                    </>

                )
            case 5:
                return (
                    <>
                        <T>
                            Ваше семейное положение
                        </T>

                        <FormInputRadioButton
                            control={control} name='familystatus'
                            options={['Холост', 'Не замужем', 'Женат', 'Замужем']}
                        />
                    </>
                )
            case 6:
                return (
                    <>
                        <T>Введите ваш номер телефона</T>
                        <FormInputReactMask
                            control={control}
                            name='phone'
                            rules={{required: true}}
                        />

                    </>

                )
            case 7:
                return (
                    <>
                        <T>Введите ссылку на вашу страничку Vkontakte</T>
                        <T>Кликни что бы подставить : <a onClick={(e) => {
                            setValue('vk', 'https://vk.com/goroskoper2000')
                        }}>https://vk.com/goroskoper2000</a></T>
                        <FormInputText control={control} label='Ссылка вконтакте' name="vk" />
                    </>

                )
            case 8:
                return (
                    <>
                        <T>
                            Чем я Вам могу помочь? Что бы Вы хотели? Кого бы Вы хотели найти?
                            Просьба дать максимально развернутый ответ.
                        </T>
                        <FormInputTextAria
                            control={control}
                            label='Чем я Вам могу помочь?'
                            name='helptext'
                        />
                    </>

                )
            case 9:
                return (
                    <>
                        <T>Вид поиска</T>
                        <FormInputRadioButton
                            control={control}
                            name='targetsearch'
                            options={['Активный', 'Пассивный', 'Консультация', 'Встреча']}
                        />
                        <FormInputTextAria
                            control={control}
                            label='Вид поиска'
                            name="targetsearchtext"
                        />
                    </>

                )
            case 10:
                return (
                    <>
                        <T>Расскажите, пожалуйста, о себе для презентации вас,
                            вашей потенциальной второй половинке? Образование?
                            Сфера деятельности? Должность? Качества? Увлечения? Достижения?
                            Район проживания г. Н. Новгорода?
                        </T>
                        <FormInputTextAria
                            label='Расскажите о себе'
                            name="about"
                            control={control}
                        />
                    </>

                )
            case 11:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Введите ваш рост
                        </Typography>
                        <FormInputText control={control} label='Ваш рост' name="height" />
                    </>

                )
            case 12:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Введите ваш вес
                        </Typography>
                        <FormInputText control={control} label='Ваш вес' name="weight" />
                    </>

                )
            case 13:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Дата вашег рожждения?
                        </Typography>
                        <FormInputText control={control} label='Ссылка Instagram' name="inst" />
                        <FormInputText control={control} label='Ссылка Facebook' name="fb" />
                        <FormInputText control={control} label='Ссылка Одноклассники' name="ok" />
                    </>

                )
            case 14:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Дата окончания отношений
                        </Typography>
                        <FormInputDate control={control} label='Дата окончания отношений' name="dateofend" />
                    </>

                )
            case 15:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Откуда узнали обо мне
                        </Typography>
                        <FormInputText control={control} label='Откуда узнали обо мне' name="source" />
                    </>

                )
            case 16:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Прикрепите свои лучшие 3-4 фото
                        </Typography>
                        {
                            Object.values(imageArr).map((img, index) => {

                                return (
                                <Card sx={{ maxWidth: "24%", display: 'inline-block', ml: '2%' }} key={index} onClick={() => deleteImage(index)}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={img}
                                            alt="green iguana"
                                        />
                                        <CardContent >
                                            <Typography gutterBottom variant="h5" component="div" >
                                                Delete
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )})
                        }
                        <input {...register('o_img1')} type="file" onChange={handleChange}/>
                        <input {...register('o_img2')} type="file" onChange={handleChange} />
                        <input {...register('o_img3')} type="file" onChange={handleChange} />
                        <input {...register('o_img4')} type="file" onChange={handleChange} />
                        {/* images */}
                    </>

                )
            case 17:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Выберите дату заполнения анкеты
                        </Typography>
                        <FormInputDate
                            control={control} label='Выберите дату заполнения анкеты' name="registermonth" />
                        {/* date */}
                    </>

                )
            case 18:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Курение?
                        </Typography>
                        <FormInputRadioButton
                            control={control}
                            name='smoke'
                            options={['Да', 'Нет']}
                        />
                    </>

                )
            case 19:
                return (
                    <>
                        <Typography variant="subtitle1" component="p">
                            Наличие детей
                        </Typography>
                        <FormInputRadioButton
                            control={control}
                            name='children'
                            options={['Да', 'Нет']}
                        />
                    </>

                )
            case 20:
                return (
                    <>
                        <T>
                            Дата рождения детей и их пол
                        </T>
                        <FormInputTextAria
                            control={control}
                            name='birthdaychild1'
                            label="День рождение 1 ребенка"
                        />
                        <FormInputTextAria
                            control={control}
                            name='birthdaychild2'
                            label="День рождение 2 ребенка"
                        />
                        <FormInputTextAria
                            control={control}
                            name='birthdaychild3'
                            label="День рождение 3 ребенка"
                        />
                        <FormInputTextAria
                            control={control}
                            name='birthdaychild4'
                            label="День рождение 4 ребенка"
                        />
                    </>

                )
            case 21:
                return (
                    <>
                        <T>
                            Бывший муж (парень) или жена (девушка) в год кого родились
                            (если не знаете, то просто год рождения)?
                        </T>
                        <FormInputTextAria
                            control={control}
                            label=''
                            name='lastlove'
                        />
                    </>

                )
            case 22:
                return (
                    <>
                        <T>
                            Знак зодиака бывшего мужа или жены?
                            (если не знаете, то просто число и месяц даты рождения)
                        </T>
                        <FormInputTextAria
                            label="Знак зодиака бывшего"
                            control={control}
                            name='lastzodiak'
                        />
                    </>

                )
            case 23:
                return (
                    <>
                        <T>Введите email:</T>
                        <FormInputUniversalText
                            label='Enter your email'
                            type='email'
                            name='email'

                            focused
                            control={control}
                            required
                        />
                        <T>Введите пароль:</T>
                        <FormInputUniversalText
                            type='password'
                            label='Password'
                            name='password'
                            required
                            error={!!errors.passwordConfirm?.type}
                            rules={{ min: 3}}
                            control={control}
                            focused
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <T>Введите пароль повторно:</T>
                        <FormInputUniversalText
                            type='password'
                            label='Confirm Password'
                            name='passwordConfirm'
                            required
                            error={!!errors.passwordConfirm?.type}
                            rules={{ min: 3, validate: (value: any) => value === password.current }}
                            control={control}
                            focused
                            className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.passwordConfirm?.type ? 'Пороли не совпадают' : ''}</div>

                    </>

                )
            case 24:
                return (
                    <>
                        <T>
                            В ближайшее время мы с вами свяжемся и подтвердим информацию
                        </T>

                        {/* success and log in button *1 */}
                    </>

                )
            case 25:
                return (
                    <>
                        <T>
                            После рассмотрения вы можете войти в свой личный кабинет
                        </T>

                        <Link to={'/login'}>Войти</Link>
                    </>

                )
            default:
                return <h1>Чот не работает форма</h1>
        }
    }


    return(
        <Box ref={quizRef} sx={{
            textAlign: 'center'

            }}>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <T sx={{ color: purple[600], fontSize: '1.75rem' }}>Заявка на счастливую личную жизнь</T>
                <T>
                    Шаг <span style={{ color: red[800] }}>{value} </span>
                    из  <span style={{ color: red[800] }}> 25</span>
                </T>
                {renderForm()}
                <p>
                    <Button variant="contained" onClick={() => dispatch(decrement())}
                        disabled={value === 0} sx={{ marginRight: '5%', bgcolor: purple[600]}}>Назад</Button>
                    {(value > 6) ?
                        <Button type="submit" variant="contained" onClick={() => dispatch(increment())}
                            disabled={value === 25} sx={{ marginLeft: '5%', bgcolor: purple[600] }} >Вперед</Button> :
                        <Button variant="contained" onClick={() => dispatch(increment())}
                            sx={{ marginLeft: '5%', bgcolor: purple[600] }}>Вперед</Button>
                    }
                </p>
            </Form>
        </Box>
    )
}



export default forwardRef((props, ref) => <Quiz quizRef={ref} />);
