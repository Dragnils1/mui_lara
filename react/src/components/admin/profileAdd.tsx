import { Button, Card, CardActionArea, CardContent, CardMedia, styled, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ReactInputMask from "react-input-mask"
import {  useSubmitDataWithRerenderMutation } from "../../services/goroskop"
import { QuizType } from "../../types/quiz"
import restrictRole from "../../functions/restrictRole"
import FormInputDate from "../quiz/form-component/FormInputDate"
import FormInputDropdown from "../quiz/form-component/FormInputDropDown"
import FormInputRadioButton from "../quiz/form-component/FormInputRadioButtons"
import FormInputText from "../quiz/form-component/FormInputText"
import FormInputTextAria from "../quiz/form-component/FormInputTextArea"
import LangLove from "../quiz/langLoveDropDown"
import T from "../quiz/OnlyText"
import PopUpImage from "../quiz/PopUpImage"
import ZodiakDropDown from "../quiz/zodiakDropDown"
import Carousel from "../forAll/Carousel"
import FormInputReactMask from "../quiz/form-component/FormInputReactMask"
import { useAppSelector } from "../../hooks/hooks"


interface ImmageArr {
    o_img1: File | string;
    o_img2: File | string;
    o_img3: File | string;
    o_img4: File | string
}

const Form = styled('form')({
    // display: 'none',
    textAlign: 'left',
    maxWidth: '45%',
    '& > div': {
        border: '1px solid rgb(80, 61, 122)'
    },
    '& > div > label.MuiFormLabel-filled': {
        display: 'none'
    },
    '& > div > label.css-u9osun': {
        display: 'none'
    },
    '& > div > label.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root': {
        display: 'none'
    },
    marginLeft: '25%',
});

const Input = styled('input')({
    display: 'none',
});


const elementsForDelete:
    Array<keyof  Pick<QuizType, 'o_img1' | 'o_img2' | 'o_img3' | 'o_img4'>> = ['o_img1', 'o_img2', 'o_img3', 'o_img4']


const ProfileAdd: FC = () => {

    const [imageArr, setImageArr] = useState<ImmageArr>({
        o_img1: '',
        o_img2: '',
        o_img3: '',
        o_img4: ''
    })

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [submitData, { data, error }] = useSubmitDataWithRerenderMutation()
    const { user } = useAppSelector(state => state.auth)

    const slider = Object.values(imageArr).map(item => {
        return (
            <img
                key={item}
                src={item}
                style={{ maxWidth: '45%', marginLeft: '27.5%' }}
                alt={item}
                loading="lazy"
            />
        )


    })


    const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm<QuizType>({
        defaultValues: {
            fav: "",
            fav_date: "",
            fav_modify: "",
            comp: "[]",
            firstname: "",
            gender: "М",
            city: "",
            birthday: "",
            year: "",
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
            r_pass: "",
            dateofend: "",
            source: "",
            source_type: "Ручной",
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
        }
    });



    const onSubmit: SubmitHandler<QuizType> = data => {

        // enqueueSnackbar('Клиент успешно добавлен', {
        //     variant: 'success',
        // });

        let newData = data
        let fd = new FormData()

        newData.images = ['','','',''].join()

        // Object.keys(imageArr).forEach(el => {

        //     if(newData[(el as any) as keyof QuizType]) {
        //         fd.append(el, newData[(el as any) as keyof QuizType] as File)
        //     }



        // })

        elementsForDelete.forEach(el => {

            console.log(data[el]);

            if(newData[el]) {
                fd.append(el, newData[el])
            }

        })

        // newData.images = Object.values(imageArr).join(',')
        newData.status = data.status ?? user.role


        fd.append('profile', JSON.stringify(newData))
        // fd.append("_method", "PUT");
        // fd.append('o_img1', data.o_img1)
        // fd.append('o_img2', data.o_img2)
        // fd.append('o_img3', data.o_img3)
        // fd.append('o_img4', data.o_img4)
        submitData({name: `profile`, data: fd})
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const fR = new FileReader()

        e.target.files && fR.readAsDataURL(e.target.files[0])


        fR.onload = () => {
            setImageArr({ ...imageArr, [e.target.name]: fR.result })

        }

        const strOfImg = (Object.values(imageArr)).join(',')

        setValue(e.currentTarget.name as keyof QuizType, e.target.files ? e.target.files[0] : '')
        setValue('images', strOfImg)


    }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const fR = new FileReader()

    //     e.target.files && fR.readAsDataURL(e.target.files[0])


    //     fR.onload = () => {
    //         setImageArr({ ...imageArr, [e.target.name]: fR.result })

    //     }

    //     const nameOfImg = e.target.name === 'o_img2' || e.target.name === 'o_img3' || e.target.name ===  'o_img4'  ? e.target.name : 'o_img1'
    //     const file = e.target.files ? e.target.files[0] : ''

        // console.log(nameOfImg, file);


        // setValue(nameOfImg, file)


    // }

    const deleteImage = (nameImg: number) => {
        setImageArr({ ...imageArr, [Object.keys(imageArr)[nameImg]]: null })
    }


    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} style={{textAlign: 'left', maxWidth: '45%',
                marginLeft: '25%'}}>
                <Carousel items={slider} />
                <T>Имя и фамилия </T>
                <FormInputText
                    control={control} name='firstname' label="Имя и фамилия"
                    rules={{ required: true }}
                />

                {
                    Object.values(imageArr).map((img, index) => (
                        <Card sx={{ minWidth: '21%', margin: '1%', maxWidth: "23%", display: 'inline-block' }} key={index} onClick={() => deleteImage(index)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={img}
                                    alt="Фото нет"
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" >
                                        Delete
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))
                }

                <label htmlFor="contained-button-file1">
                    <Input {...register('o_img1')} onChange={handleChange} id="contained-button-file1" type="file" />
                    <Button variant="contained" component="span">
                        Картинка 1
                    </Button>
                </label>
                <label htmlFor="contained-button-file2">
                    <Input {...register('o_img2')} onChange={handleChange} id="contained-button-file2" type="file" />
                    <Button variant="contained" component="span">
                        Картинка 2
                    </Button>
                </label>
                <label htmlFor="contained-button-file3">
                    <Input {...register('o_img3')} onChange={handleChange} id="contained-button-file3" type="file" />
                    <Button variant="contained" component="span">
                        Картинка 3
                    </Button>
                </label>
                <label htmlFor="contained-button-file4">
                    <Input {...register('o_img4')} onChange={handleChange} id="contained-button-file4" type="file" />
                    <Button variant="contained" component="span">
                        Картинка 4
                    </Button>
                </label>

                <T>Дата рождения</T>
                <FormInputDate control={control} label='День рождения' name="birthday" />


                <T>
                    В год какого животного вы родились?
                </T>
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

                <T>
                    Ваше семейное положение
                </T>
                <FormInputRadioButton
                    control={control} name='familystatus'
                    options={['Холост', 'Не замужем', 'Женат', 'Замужем']}
                />

                <T>Введите ваш номер телефона</T>
                <FormInputReactMask
                    control={control}
                    name='phone'
                />

                <T>Введите ссылку на страницу Vkontakte</T>
                <FormInputText control={control} label='Ссылка вконтакте' name="vk" />

                <T>Коментарий</T>
                <FormInputTextAria control={control} label='Комментарий' name="comment" sx={{ height: '400px' }} />

                <T>
                    Откуда узнали обо мне
                </T>
                <FormInputTextAria control={control} label='Откуда узнали обо мне' name="source" />

                <T>
                    Информация о клиенте
                </T>
                <FormInputTextAria
                    name="about"
                    label="Информация о клиенте"
                    control={control}
                />

                <T>
                    Введите ваш рост
                </T>
                <FormInputText control={control} label='рост' name="height" />

                <T>
                    Введите ваш вес
                </T>
                <FormInputText control={control} label='вес' name="weight" />

                <T>Пол</T>
                <FormInputDropdown
                    control={control} name='gender' label="Выберите пол"
                    options={[{ value: 'М' }, { value: 'Ж' }]}
                />

                <T>
                    Социальные сети
                </T>
                <FormInputText control={control} label='Ссылка Instagram' name="inst" />
                <FormInputText control={control} label='Ссылка Facebook' name="fb" />
                <FormInputText control={control} label='Ссылка Одноклассники' name="ok" />

                <T>
                    Email
                </T>
                <FormInputText control={control} label='Ссылка Instagram' name="email" />

                <T>
                    Дата вступления в базу
                </T>
                <FormInputDate control={control} label='Выберите дату заполнения анкеты' name="created_at" />

                <T>
                    Месяц вступления в базу
                </T>
                <FormInputText control={control} label='Месяц вступления в базу' name="registermonth" />

                <T>
                    Курение?
                </T>
                <FormInputRadioButton
                    control={control}
                    name='smoke'
                    options={['Да', 'Нет']}
                />

                <T>
                    Наличие детей
                </T>
                <FormInputRadioButton
                    control={control}
                    name='children'
                    options={['Да', 'Нет']}
                />

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

                <T>
                    Пожелания клиента
                </T>
                <FormInputTextAria
                    control={control}
                    label='Пожелания клиента'
                    name='helptext'
                />

                <T>Вид поиска</T>
                <FormInputRadioButton
                    control={control}
                    name='targetsearch'
                    options={['Активный', 'Пассивный', 'Консультация', 'Встреча']}
                />
                <FormInputTextAria
                    style={{ marginTop: '15px' }}
                    control={control}
                    label='Вид поиска'
                    name="targetsearchtext"
                />

                <T>
                    Финансовый отчет
                </T>
                <FormInputText control={control} label='Финансовый отчет' name="report" />

                <T>
                    Дата окончания отношений
                </T>
                <FormInputDate control={control} label='Дата окончания отношений' name="dateofend" />

                <T>
                    Бывшие в год какого животного родились?
                </T>
                <LangLove name="lastlove" control={control} setValue={setValue} />

                <T>
                    Бывшие знак зодиака по западной астрологии
                </T>
                <ZodiakDropDown name="lastzodiak" control={control} setValue={setValue} />

                <T>
                    Пароль
                </T>
                <FormInputText control={control} label='Пароль' name="password" />


                <T>Внешний код</T>
                <FormInputText control={control} label='Код регион' name="user_OutNum" />

                <T>Внутренний код</T>
                <FormInputText control={control} label='Код регион' name="user_InNum" />

                <T>Регион</T>
                <PopUpImage name="region_code.jpg" alt="Код региона Россия" />
                <FormInputText control={control} label='Код регион' name="city" />

                <hr />

                <Button type="submit" variant="contained" >Сохранить</Button>
                <Button variant="contained">отправить</Button>
            </Form>
        </>
    )
}

export default ProfileAdd
