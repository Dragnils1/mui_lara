import { Box, Button, CardActionArea, CardMedia, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useGetApiQuery } from "../../services/goroskop";
import EnhancedTable from "../admin/constituents/Table";
import Card from '@mui/material/Card';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Header from "../forAll/header";
import { Data } from "../../types/data";
import { purple } from "@mui/material/colors";
import User from "../cabinet/user";
import T from "../quiz/OnlyText";
import { Link } from "react-router-dom";
import useWhoIs from "../../hooks/useWhoIs";

const BaseAdminers: FC<{}> = () => {    

    const [name, setName] = useState('Общая база')
    const [user, setUser] = useState<Data>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const WhoIs = useWhoIs()

    const { data, error, isLoading, currentData } = useGetApiQuery('profiles.php')

    let newDate = data

    if (name === 'активный поиск') {
        newDate = data?.filter(elem => elem.vip === '1')
    } else if (name === 'пассивный поиск') {
        newDate = data?.filter(elem => elem.vip === '0')
    } else {
        newDate = data
    }

    const changeName = (name: string) => {
        setName(name.toLowerCase());
    }

    const MemoizedTable = useCallback(() =>
        <>
            {data && (
                <>
                    <EnhancedTable data={newDate ? newDate : data} nameOfTable={name} />
                </>
            )}
        </>
        , [currentData, name])
        

    return(
        <>
            {/* <Header /> */}
            {WhoIs.whoIs !== 'admin' ? (
                    <>
                        {user ?
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                scroll={'body'}
                                aria-labelledby="scroll-dialog-title"
                                aria-describedby="scroll-dialog-description"
                            >
                                <DialogContent>
                                    {/* <User user={user} /> */}
                                    <Link target="_blank" to={'/upload/' + user.images.split(',')[0]}>Ссылка на картинку</Link>
                                    <h1>Заплати потом смотри :)</h1>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Закрыть</Button>
                                </DialogActions>
                            </Dialog>
                            : null}

                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12, lg: 16 }} 
                            sx={{ justifyContent: 'center' }}>
                            {data?.filter(elem => elem.gender[0] !== 'M')
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
                            {data?.filter(elem => elem.gender[0] !== 'Ж').map(elem => {

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
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )

                            })}
                        </Grid>
                    </>
                )
            : (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="contained" sx={{ width: '100%' }} onClick={(e) => { changeName(e.currentTarget.innerText) }}>Активный поиск</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" sx={{ width: '100%' }} onClick={(e) => { changeName(e.currentTarget.innerText) }}>Пассивный поиск</Button>
                        </Grid>
                        <Grid item xs={15}>
                            <Button variant="contained" sx={{ width: '100%' }} onClick={(e) => { changeName(e.currentTarget.innerText) }}>Общая база</Button>
                        </Grid>
                    </Grid>

                    {error && <h1>oops, er: {error}</h1>}
                    {isLoading && <h1>Загрузка, подождите пожалйста</h1>}
                    <MemoizedTable />

                    {/* <Box
                        sx={{
                            width: 300,
                            height: 300,
                            backgroundColor: 'primary.dark',
                        }}
                    >
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography variant="h5" component="div">
                                    fdsafsfdsds
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography variant="body2">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box> */}
                </>
            )}
            
        </>
    )
}

export default BaseAdminers