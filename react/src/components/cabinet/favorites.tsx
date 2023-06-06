
import { FC, useEffect, useState } from "react";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, Modal } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useSubmitDataMutation } from "../../services/goroskop";
import User from "./user";
import { Data } from "../../types/data";
import { useParams } from "react-router-dom";
import T from "../quiz/OnlyText";
import Header from "../forAll/header";



const Favorites: FC = () => {

    const [submitData, { data, error, isLoading }] = useSubmitDataMutation()
    const [submitDataProfile, profile] = useSubmitDataMutation()

    let { user_id } = useParams()    

    useEffect(() => {
        let fd = new FormData()
        fd.append('fav', user_id ?? '')

        submitData({ name: 'cabinet/get_favorites.php', data: fd })

        let fdProfile = new FormData()
        fdProfile.append('user_id', user_id ? user_id : '')

        submitDataProfile({ name: 'profile.php', data: fd })

    }, [])

    const submitEmail = (name: string) => {
        let fd = new FormData()
        fd.append('mailBody', `<h1> ${name} </h1>` ?? '<span> smth go wrong </span>')

        submitData({ name: 'phpMailer.php', data: fd })
    }

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<Data>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box sx={{ marginTop: '100px' }}>

                {isLoading && <h1>Загрузка, подождите пожалуйста</h1>}
                {user ?
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={'body'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogContent  >
                        <User user={user} />
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleClose}>Cancel</Button> */}
                        <Button onClick={handleClose}>Закрыть</Button>
                    </DialogActions>
                    </Dialog> : <T>Нажмите на звездочку в углу фото, что бы добавить в избранное:</T>}


                {(data && typeof data !== 'string') && data.map(elem => {

                    return (
                        <Card sx={{ maxWidth: 345, display: 'inline-flex', margin: '10px' }} key={elem.id}>

                            <CardActionArea
                                onClick={() => {
                                    handleOpen()
                                    setUser(elem)
                                }}>
                                <CardMedia
                                    component="img"
                                    loading="lazy"
                                    height="140"
                                    image={`/upload/${elem.images ? elem.images.split(',')[0]
                                        : '/images/noImg.jpg'}`}
                                    alt="Фото профиля"
                                    sx={{ '&': { objectFit: 'fill' } }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {elem.user_OutNum ? elem.user_OutNum : null}
                                    </Typography>
                                    <StarIcon
                                        sx={{ position: 'absolute', top: '2%', right: '2%' }}
                                        onClick={() => console.log('smth2')} />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )

                })}
                {profile.data  ? (
                    <>
                        <Button onClick={() => { (profile.data && typeof profile.data !== 'string') 
                            && submitEmail(profile.data[0].firstname) }}></Button>
                    </>
                ): null}
            </Box>

        </>
    )
}

export default Favorites