import {useState} from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Modal } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { purple } from "@mui/material/colors";

const CardCabinet = (elem: any) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const addLikedPerson = (likedPersonID: string) => {
    //     let fd = new FormData()

    //     const favArr = AuthSelector.user.fav.split(",").slice()
    //     !favArr.includes(likedPersonID) && favArr.push(likedPersonID)
    //     fd.append('fav', favArr.join(","))
    //     fd.append('id', AuthSelector.user.id)
    //     fd.append('_method', "PUT")

    //     submitData({name: `dashboard/${AuthSelector.user.id}`, data: fd})
    // }

    return (
        <Grid item xs={2} sm={3} md={3} lg={3} key={elem.id}  >
            {/* <Card  >
                <CardActionArea
                    onClick={() => {
                        handleOpen()
                        setUser(elem)
                    }}>
                    <CardMedia
                        component="img"
                        loading="lazy"
                        height="140"
                        image={elem.images.split(',')[0] ? process.env.BASE_PATH_FOR_IMAGES + elem.images.split(',')[0]
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
            </Card> */}
        </Grid>
    )
}

export default CardCabinet
