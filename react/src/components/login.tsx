import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthAccountMutation } from '../services/goroskop';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginType } from '../types/login';
import { useSnackbar } from 'notistack';
import Email from './quiz/Email';
import Pass from './quiz/Pass';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteAllCookie, setCookie } from '../functions/Cookie';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import useWhoIs from '../hooks/useWhoIs';
import { auth, MainState } from '../reducers/mainSlice';
import { changeBearerToken, changeUserAndBearerToken } from '../reducers/authSlice';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://svat-astrolog.com/">
                Svat-astrolog
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {

    const [submitData, { error, data, isError, isSuccess }] = useAuthAccountMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { handleSubmit,  control} = useForm<LoginType>();
    const dispatch = useAppDispatch()

    let navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginType> = subData => {

        // deleteAllCookie()

        // const fd = new FormData();
        // fd.append('email', subData.email)
        // fd.append('pass', subData.password)

        // const loginCredentials = {
        //     email: fd.get('email'),
        //     password: fd.get('pass')
        // }
        // console.log(fd.get('email'));

        submitData({ name: 'login', data: subData })


    };

    useEffect(() => {
        console.log(data);

        if (data?.token && data?.user) {
            dispatch(changeUserAndBearerToken(data))
        }

        if (data && isSuccess) {

            const whoIs = data.whoIs

            if (whoIs !== '[]') {

                let authData: MainState = { Account: data.Account, role: data.whoIs, easyRole: "unlogined"}

                if (whoIs === 'ok_admin' || whoIs === 'ok_mainModer' || whoIs === 'consideration'
                    || whoIs === 'ok_Moder') {

                    whoIs !== 'ok_Moder' ? setCookie('role', whoIs, 7) : setCookie('intModer', whoIs, 7)

                    authData.easyRole = "admin";
                    navigate('../admin/moderation', { replace: true })
                } else if (whoIs === 'ok_user') {
                    setCookie('role', whoIs, 7)
                    authData.easyRole = "user";
                    navigate(`../cabinet/${data.Account.id}`, { replace: true });
                }

                dispatch(auth(authData))

            } else {
                enqueueSnackbar('Упс... Неправильный логин или пороль', {
                    variant: 'error',
                })
            }
        }

        if (isError) {
            enqueueSnackbar('Упс... Ошибка на сервере', {
                variant: 'error',
            })
        }

    }, [isSuccess])




    return (

        <ThemeProvider theme={theme}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src='/images/logoChar.png' />
                    <Typography component="h1" variant="h5">
                        Войти
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <Email control={control} rules={{ autoComplete: 'email', autoFocus: true}} />
                        <Pass control={control} />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Забыли пороль?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Регистрация!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>

        </ThemeProvider>
    );
}
