import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Button, Card, CardActionArea, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { Controller, SubmitHandler, useForm, useFormState } from "react-hook-form"
import ReactInputMask from "react-input-mask"
import { useSubmitDataWithRerenderMutation} from "../../../services/goroskop"
import { QuizType } from "../../../types/quiz"
import FormInputDate from "../../quiz/form-component/FormInputDate"
import FormInputDropdown from "../../quiz/form-component/FormInputDropDown"
import FormInputRadioButton from "../../quiz/form-component/FormInputRadioButtons"
import FormInputReactMask from "../../quiz/form-component/FormInputReactMask"
import FormInputText from "../../quiz/form-component/FormInputText"
import FormInputTextAria from "../../quiz/form-component/FormInputTextArea"
import LangLove from "../../quiz/langLoveDropDown"
import T from "../../quiz/OnlyText"
import PopUpImage from "../../quiz/PopUpImage"
import ZodiakDropDown from "../../quiz/zodiakDropDown";
import { styled } from "@mui/system";
import restrictRole from "../../../functions/restrictRole";
import Carousel from "../../forAll/Carousel";

interface ImmageArr {
    o_img1: File | string | null;
    o_img2: File | string | null;
    o_img3: File | string | null;
    o_img4: File | string | null
}

interface Props {
    defaultValues: QuizType
}

const Input = styled('input')({
    display: 'none',
});

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

const FormAdmin: FC<Props> = ({defaultValues}) => {

    const [submitData, { data, error }] = useSubmitDataWithRerenderMutation()

    const imgArray = defaultValues.images.split(',')    
    
    

    const [imageArr, setImageArr] = useState<ImmageArr>({
        o_img1: imgArray[0],
        o_img2: imgArray[1],
        o_img3: imgArray[2],
        o_img4: imgArray[3] 
    })


    const slider = Object.values(imageArr).map(item => {
        return (
            <img
                key={item}
                src={`/upload/${item}`}
                style={{ maxWidth: '45%', marginLeft: '27.5%' }}
                alt={item}
                loading="lazy"
            />
        )
    })

    

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<QuizType>({
        defaultValues: defaultValues
    });
    

    const onSubmit: SubmitHandler<QuizType> = data => {
        enqueueSnackbar('Клиент успешно добавлен', {
            variant: 'success',
        });

        let newData = data

        // if (data.o_img1.toString() === '{}') {
        //     newData.o_img1 = imageArr.o_img1?.toString() ?? ''
        // }
        // if (data.o_img2.toString() === '{}') {
        //     newData.o_img2 = imageArr.o_img2?.toString() ?? ''
        // }
        // if (data.o_img3.toString() === '{}') {
        //     newData.o_img3 = imageArr.o_img3?.toString() ?? ''
        // }
        // if (data.o_img1.toString() === '{}') {
        //     newData.o_img4 = imageArr.o_img4?.toString() ?? ''
        // }

        newData.images = Object.values(imageArr).join(',')
        newData.status = data.status ?? restrictRole()
        
        let fd = new FormData()

        fd.append('data', JSON.stringify(newData))
        console.log(fd.get('data'));

        submitData({ name: 'profile_save.php', data: fd })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let fd = new FormData()

        const file = e.target.files ? e.target.files[0] : 'null'
        const fileName = e.target.files ? e.target.files[0]?.name : 'null'
        const inputName = e.currentTarget.name

        // --------- поиск старой картнки -----------
        // Берем строку картинок пользователя, потом склеиваем, получаем массив имен картинок
        // и берем катинку из массива по индексу. Сам индекс берем из названия инпута, так же склеиваем,
        // переворачиваем и берем первый элемент массива и преобразуем в число, потом отнимаем единицу
        // все легко, не правда, ли?
        const lastNameImg = defaultValues.images.split(',')[Number(e.target.name.split('').reverse()[0]) - 1]

        let newString = defaultValues.images.split(',')
        newString[newString.indexOf(lastNameImg)] = e.target.files ? e.target.files[0]?.name : 'null'

        const imageObject = { ...imageArr, [inputName]: fileName }
        const strOfImg = (Object.values(imageObject)).join(',')

        setValue(e.currentTarget.name as keyof QuizType, e.target.files ? e.target.files[0]?.name : 'null')
        setValue('images', strOfImg)

        fd.append(e.target.name, file)
        fd.append('user_id', defaultValues.id)
        fd.append('images', strOfImg)

        submitData({ name: 'updatePhoto.php', data: fd })
            .finally(async () => {
                
                setImageArr({ ...imageArr, [inputName]: fileName })
                enqueueSnackbar('Картинка изменена', {
                    variant: 'info',
                });
            })


    }

    const deleteImage = (nameImg: number) => {
        
        let fd = new FormData()

        fd.append('imgName', Object.values(imageArr)[nameImg])

        submitData({ name: 'deleteFile.php', data: fd })

        setImageArr({ ...imageArr, [Object.keys(imageArr)[nameImg]]: null })
    }

    

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} style={{
                textAlign: 'left', maxWidth: '45%',
                marginLeft: '25%'
            }}>
                <Carousel items={slider} />
                <T>Имя и фамилия </T>
                <FormInputText
                    control={control} name='firstname' label="Имя и фамилия"
                    rules={{ required: true }}
                />

                <T>
                    Контрольная дата контакта
                </T>        
                <FormInputDate control={control} label='Выберите дату заполнения анкеты' name="next_contact_date" />
                <p></p>

                {
                    Object.values(imageArr).map((img, index) => 
                        <Card sx={{ minWidth: '21%', margin: '1%', maxWidth: "23%", display: 'inline-block' }} 
                            key={index} onClick={() => deleteImage(index)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`/upload/${img}`}
                                    alt="Фото нет"
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div" >
                                        Удалить 
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
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

                <T>
                    В год какого животного вы родились?
                </T>
                <LangLove name="birthyear" control={control} setValue={setValue} />

                <T>
                    Знак зодиака по западной астрологии
                </T>
                <ZodiakDropDown name="zodiak" control={control} setValue={setValue} />

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
                <FormInputTextAria control={control} label='Комментарий' name="comment" sx={{height: '400px'}}/>

                <T>
                    Откуда узнали обо мне
                </T>
                <FormInputText control={control} label='Откуда узнали обо мне' name="source" />

                <T>
                    Информация о клиенте
                </T>
                <FormInputTextAria
                    label="Информация о клиенте"
                    name="about"
                    control={control}
                />

                <T>
                    Введите ваш рост
                </T>
                <FormInputText control={control} label='рост' name="height" />

                <T>
                    Социальные сети
                </T>
                <FormInputText control={control} label='Ссылка Instagram' name="inst" sx={{ margin: '10px 0px '}}/>
                <FormInputText control={control} label='Ссылка Facebook' name="fb" sx={{ margin: '10px 0px ' }}  />
                <FormInputText control={control} label='Ссылка Одноклассники' name="ok" sx={{ margin: '10px 0px ' }} />

                <T>
                    Email
                </T>
                <FormInputText control={control} label='Ссылка Instagram' name="email" />

                <T>
                    Дата вступления в базу
                </T>
                <FormInputDate control={control} label='Выберите дату заполнения анкеты' name="reg_date" />

                <T>
                    Месяц вступления в базу
                </T>
                {/* <Controller
                    name={'registermonth'}
                    control={control}
                    render={({ field }) => {
                        // console.log(new Date(field.value).toLocaleString('ru-RU', { month: 'long', year: 'numeric' }));
                        return (
                            <TextField
                                size="small"
                                onChange={field.onChange}
                                value={(field.value.trim() && new Date(field.value).toLocaleString('ru-RU', { month: 'long', year: 'numeric' })) ?? ' '}
                                fullWidth
                                label={'месяц вступления в базу'}
                                variant="outlined"

                            />
                        )
                    }}
                /> */}
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
                    label="Пожелания клиента"
                    name='helptext'
                />

                <T>Вид поиска</T>
                <FormInputRadioButton
                    control={control}
                    name='targetsearch'
                    options={['Активный', 'Пассивный', 'Консультация', 'Встреча']}
                />
                <FormInputTextAria
                    style={{marginTop: '15px'}}
                    control={control}
                    name="targetsearchtext"
                    label="Вид поиска"
                />

                <T>
                    Финансовый отчет
                </T>
                <FormInputText control={control} label='Финансовый отчет' name="report" />

                <T>Пол</T>
                <FormInputDropdown
                    control={control} name='gender' label="Выберите пол"
                    options={[{ value: 'М' }, { value: 'Ж' }]}
                />
                
                <T>
                    Введите ваш вес
                </T>
                <FormInputText control={control} label='вес' name="weight" />

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
                <FormInputText control={control} label='Пароль' name="pass" />

                {defaultValues?.visible_pass && (
                    <>
                        <T>
                            Видимый пароль
                        </T>
                        <FormInputText control={control} label='Видимый пароль' name="visible_pass" />
                    </>
                )}

                <T>Внешний код</T>
                <FormInputText control={control} label='Код регион' name="user_OutNum" />

                <T>Внутренний код</T>
                <FormInputText control={control} label='Код регион' name="user_InNum" />

                <T>Регион</T>
                <PopUpImage name="region_code.jpg" alt="Код региона Россия" />
                <FormInputText control={control} label='Код регион' name="city" />

                <T>
                    Источник
                </T>
                <FormInputDropdown
                    name={'source_type'}
                    control={control}
                    setValue={setValue}
                    label="Источник"
                    options={[
                        { value: 'Квиз' },
                        { value: 'Ручной' },
                    ]}
                />

                <T>
                    VIP
                </T>
                <FormInputDropdown
                    name={'vip'}
                    control={control}
                    setValue={setValue}
                    label="VIP"
                    options={[
                        { label: 'Нет', value: '0' },
                        { label: 'Да', value: '1' },
                    ]}
                />

                <T>
                    Статус
                </T>
                <FormInputDropdown
                    name={'status'}
                    control={control}
                    setValue={setValue}
                    label="Статус"
                    options={[
                        { label: 'На модерации у админа', value: '10' },
                        { label: 'Общая база', value: '29' },
                        { label: 'Архив', value: '30' },
                        { label: 'Корзина', value: '32' },
                    ]}
                />

                <T>Дата рождения</T>
                <FormInputDate control={control} label='День рождения' name="birthday" />

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

                <hr />

                <Button type="submit" variant="contained" >Сохранить</Button>
                <Button variant="contained">отправить</Button>
            </Form>
        </>
    )
}

export default FormAdmin