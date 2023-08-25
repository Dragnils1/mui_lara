import { Box, DialogTitle } from "@mui/material";
import { FC } from "react";
import AliceCarousel from "react-alice-carousel";
import { Data } from '../../types/data'
import T from "../quiz/OnlyText";
import 'react-alice-carousel/lib/alice-carousel.css';
import Carousel from "../forAll/Carousel";

const User: FC<{ user: Data }> = ({ user }) => {

    const slider = user.images.split(',').map(item => {
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


    return (
        <>
            <Box sx={{

                '& > p': {
                    userSelect: 'none',
                    lineHeight: '1.4'
                },

            }}>
                <DialogTitle id="scroll-dialog-title">{user.firstname}</DialogTitle>
                <Carousel items={slider} />

                <T><b>Внешний код:</b> {user.user_OutNum}</T>
                <T><b>Внутренний код:</b> {user.user_InNum}</T>
                <T><b>Регион:</b> {user.city}</T>
                <T><b>Дата рождения:</b> {user.birthday}</T>
                <T><b>Знак зодиака по восточной астрологии:</b> {user.birthyear}</T>
                <T><b>Знак зодиака по западной астрологии:</b> {user.zodiak}</T>
                <T><b>Основной язык любви:</b> {user.langlove} </T>
                <T><b>Второстепенный язык любви:</b> {user.langlove2}</T>
                <T><b>Номер телефона:</b> {user.phone}</T>
                <T><b>Ссылка на страницу вконтакте:</b> <a href={user.vk} target='_blanck'>{user.vk}</a></T>
                <T><b>Семейное положение:</b> {user.familystatus}</T>
                <T><b>Пол:</b> {user.gender}</T>
                <T><b>Вид поиска партнера:</b> {user.targetsearch}</T>
                <T><b>Рост:</b> {user.height}</T>
                <T><b>С.о.о.к.к. (сведения об отношении к курению):</b> {user.smoke}</T>
                <T><b>С.о.н.д. (сведения о наличии детей):</b> {user.children}</T>
                <T><b>Email:</b> {user.email}</T>
                <T><b>Дата вступления в базу:</b> {user.registermonth}</T>
                <T><b>Информация о себе:</b> {user.about}</T>

            </Box>
        </>
    )
}

export default User