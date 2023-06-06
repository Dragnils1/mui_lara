import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteCookie } from "../../functions/Cookie";
import T from "../quiz/OnlyText";
import Filtration from "../cabinet/filtration";
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import { auth, MainState } from "../../reducers/mainSlice";

interface HeaderProps {
    name?: string
}

const Header: FC<HeaderProps> = ({ name }) => {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const Logout = () => {
        deleteCookie('role');
        dispatch(auth({} as MainState))
        navigate('/', { replace: true });
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');


    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return(
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Goroskop
                        </Typography>
                        <Link to="./favorites">Избранные</Link>
                        <Box >
                            <div>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    scroll={scroll}
                                    aria-labelledby="scroll-dialog-title"
                                    aria-describedby="scroll-dialog-description"
                                >
                                    <DialogTitle id="scroll-dialog-title">Настройки</DialogTitle>
                                    <DialogContent dividers={scroll === 'paper'}>
                                        <DialogContentText
                                            id="scroll-dialog-description"
                                            ref={descriptionElementRef}
                                            tabIndex={-1}
                                        >
                                            <Filtration />
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Закрыть</Button>
                                    </DialogActions>
                                </Dialog>
                                <Button onClick={handleOpen} sx={{
                                    height: '50px',
                                    width: '60%',
                                    color: '#fff',
                                    backgroundColor: '#f99df0',
                                    backgroundImage: 'linear-gradient(155deg, #8768c8, #f99df0)'
                                }}
                                >
                                    Настрйоки
                                </Button>
                            </div>
                            
                            {name && (
                                <>
                                    <T>
                                        Привет, {name}
                                    </T>
                                </>
                            )}
                            <Button
                                sx={{ ackgroundColor: 'red' }}
                                variant='contained'
                                onClick={Logout}
                            >
                                Выйти
                            </Button>

                        </Box>
                        
                    </Toolbar>
                </AppBar>
                <Outlet />
            </Box>
        </>
    )
}

export default Header