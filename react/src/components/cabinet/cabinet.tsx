import { FC, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useGetApiQuery, useSubmitDataMutation } from "../../services/goroskop";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Modal } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import User from "./user";
import { Data } from "../../types/data";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { purple } from "@mui/material/colors";
import { Box } from "@mui/system";
import Favorites from "./favorites";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useAppSelector } from "../../hooks/hooks";
import T from "../quiz/OnlyText";
import CabinetHeader from "./cabinetHeader";
import useWhoIs from "../../hooks/useWhoIs";

const Cabinet: FC = () => {

    let { user_id } = useParams()
    const { filter } = useAppSelector(state => state.cabinet)

    const [submitData, profile] = useSubmitDataMutation()
    const [submitLikedPerson, LikedPerson] = useSubmitDataMutation()
    const profiles = useGetApiQuery('profiles.php')
    
    const [filterationArr, setFilterationArr] = useState<Data[]>(profiles.data ?? []);
    const [user, setUser] = useState<Data>();
    const [open, setOpen] = useState(false);
    const whois = useWhoIs();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addLikedPerson = (likedPersonID: string) => {
        let fd = new FormData()
        
        const favArr = whois.Account.fav.split(",").slice()
        !favArr.includes(likedPersonID) && favArr.push(likedPersonID)
        fd.append('fav', favArr.join(","))
        fd.append('user_id', whois.Account.id ?? '')

        submitData({ name: 'cabinet/favorites.php', data: fd })
    }

 
    useEffect(() => {
        let fd = new FormData()
        fd.append('user_id', user_id ? user_id : '')

        submitData({ name: 'profile.php', data: fd })

    }, [user_id])

    React.useLayoutEffect(() => {
        profiles.data && ((filter) ? setFilterationArr(profiles.data?.filter(e => {

            return Object.values(filter).filter(el => !!el).length === Object.values(filter).map((value, index) => {                
                
                if (!!value) {

                    value = value.trim();

                    // console.log(e, value, index);
                    
                    if (index === 0) {
                        return Number(e.birthday.split('.')[2]) >= Number(value)
                    } else if (index === 1) {                        
                        return Number(e.birthday.split('.')[2]) <= Number(value) 
                    }

                    if (Object.values(e).indexOf(value) !== (-1)) {

                        return value
                    }

                }

                return undefined

            }).filter(el => !!el).length
        })
        ) : setFilterationArr(profiles.data)) 
        console.log(filter);
        
    }, [profiles.isSuccess, filter]) 

    return(
        <>
            <Box >
                {/* {(profile.data && typeof profile.data !== 'string') ?
                    <Favorites fav={profile.data[0] && profile.data[0].fav} /> : null}
                <hr /> */}
                {profiles.isLoading && <h1>Загрузка, подождите пожалуйста</h1>}
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
                    </Dialog>
                    : null }
                    {/* <T>Нажмите на звездочку в углу фото, что бы добавить в избранное:</T> */}
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12, lg: 16 }} 
                    sx={{justifyContent: 'center'}}>
                    {profile.data && 
                        filterationArr?.filter(elem => elem.vip === '1' && 
                            elem.gender[0] !== ((profile?.data && typeof profile?.data !== "string") 
                                ? profile?.data[0].gender[0] : "Ж") )
                        .sort((a, b) => {
                            return (new Date(a.birthday.split('.').reverse().join('-')).getTime() >= new Date(b.birthday.split('.').reverse().join('-')).getTime()) ? -1 : 1;
                         })
                        .map(elem => {

                        return (
                            <Grid item xs={2} sm={3} md={3} lg={3} key={elem.id}  >
                                <Card  >
                                    <CardActionArea
                                        onClick={() => {
                                            handleOpen()
                                            setUser(elem)
                                        }}>
                                        <CardMedia
                                            component="img"
                                            loading="lazy"
                                            height="140"
                                            image={elem.images.split(',')[0] ? `/upload/${elem.images.split(',')[0]}`
                                                : '/images/noImg.jpg'}
                                            alt="Фото профиля"
                                            sx={{ '&': { objectFit: 'cover' }, minHeight: '17vh' }}
                                        />
                                        <Typography gutterBottom variant="h6" component="div" sx={{
                                            position: 'absolute', top: '72%', left: '2%', bgcolor: purple[50],
                                            borderRadius: '8px', padding: '3px'
                                        }}>
                                            {elem.user_OutNum ? elem.user_OutNum : null}
                                        </Typography>
                                        <StarIcon
                                            // sx={elem.vip !== '0' ? { position: 'absolute', top: '2%', right: '2%', color: 'orange' } : { position: 'absolute', top: '2%', right: '2%'}}
                                            sx={{ position: 'absolute', top: '2%', right: '2%', color: 'rgba(0, 0, 0, 0.7)' }}
                                            onClick={(e) => { e.currentTarget.style.color = 'orange'; addLikedPerson(elem.id) }} />
                                        <AutoAwesomeIcon
                                            sx={{ position: 'absolute', top: '72%', right: '2%', color: purple[200] }}
                                            onClick={() => console.log('smth2')} />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )

                    })}
                </Grid>
                <hr />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12, lg: 16 }} 
                    sx={{ justifyContent: 'center' }}>
                    {filterationArr?.filter(elem => elem.vip === '0' &&
                        elem.gender[0] !== ((profile?.data && typeof profile?.data !== "string")
                            ? profile?.data[0].gender[0] : "Ж"))
                        .sort((a, b) => {
                            return (new Date(a.birthday.split('.').reverse().join('-')).getTime() >= new Date(b.birthday.split('.').reverse().join('-')).getTime()) ? -1 : 1;
                        })
                        .map(elem => {

                        return (
                            <Grid item xs={2} sm={3} md={3} lg={3} key={elem.id}  >
                                <Card  >
                                    <CardActionArea
                                        onClick={() => {
                                            handleOpen()
                                            setUser(elem)
                                        }}>
                                        <CardMedia
                                            component="img"
                                            loading="lazy"
                                            height="140"
                                            image={elem.images.split(',')[0] ? `/upload/${elem.images.split(',')[0]}`
                                                : '/images/noImg.jpg'}
                                            alt="Фото профиля"
                                            sx={{ '&': { objectFit: 'cover' }, minHeight: '17vh' }}
                                        />
                                        <Typography gutterBottom variant="h6" component="div" sx={{
                                            position: 'absolute', top: '72%', left: '2%', bgcolor: purple[50],
                                            borderRadius: '8px', padding: '3px'
                                        }}>
                                            {elem.user_OutNum ? elem.user_OutNum : null}
                                        </Typography>
                                        <StarIcon
                                            // sx={elem.vip !== '0' ? { position: 'absolute', top: '2%', right: '2%', color: 'orange' } : { position: 'absolute', top: '2%', right: '2%'}}
                                            sx={{ position: 'absolute', top: '2%', right: '2%', color: 'rgba(0, 0, 0, 0.7)' }}
                                            onClick={(e) => { e.currentTarget.style.color = 'orange'; addLikedPerson(elem.id) }} />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )

                    })}
                </Grid>
                <Outlet />
            </Box>
        </>
    )
}

export default Cabinet