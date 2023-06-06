import { Box, Button, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"
import * as React from 'react';
import Quiz from "./quiz";
import ScrollDialog from "./quiz/Dialog";

const MainPage: FC = () => {

    return(
        <>
            <Box sx={{ textAlign: 'center', margin: '20vh 20vw'}}>
                <Typography variant="h4" component="h1" sx={{
                    '& > p': {
                        margin: '10px 0'
                    }
                }}>
                    Эксклюзивный астропсихолог, Сердцевед, 
                    <p>Сват-Астролог Вячеслав Горелов-</p>
                    <p>"Cчастье уже рядом!"</p>
                    <p>Анкета для создания счастливой личной жизни!</p>
                    <p style={{ color: '#b00000' }}>Перед заполнением анкеты, рекомендую ознакомиться с отзывами:</p>
                    <p>Вконтакте: <a rel='noreferrer' target="_blank" href='https://vk.com/wall2782679_3073' style={{ color: 'blue', fontSize: '0.8em' }}>https://vk.com/goroskoper2000</a></p>
                    <p>Официальный сайт: <a rel='noreferrer' target="_blank" href='https://svat-astrolog.ru/?page_id=143' style={{ color: '#b00000', fontSize: '0.8em' }}>https://svat-astrolog.ru</a></p>
                </Typography>
                
                <ScrollDialog mainPage>
                    <Quiz />
                </ScrollDialog>
                {/* <p>
                    <Button variant="outlined">
                        <Link to={"/base"}>Посмотреть доступные анкеты</Link>
                    </Button>
                </p> */}
                <p>
                    <Button variant="outlined">
                        <Link to={"/login"}> Войти</Link>
                    </Button>
                </p>
                
            </Box>
        </>
    )
}
export default MainPage