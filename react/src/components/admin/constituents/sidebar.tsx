import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FC, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { changePath, p } from '../../../reducers/adminSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Button, Grid } from '@mui/material';
import { deleteCookie, getCookie } from '../../../functions/Cookie';
import { useGetApiQuery } from '../../../services/goroskop';
import { AuthState, changeUserAndBearerToken } from '../../../reducers/authSlice';

interface SidebarCells {
    name: string,
    href: string,
    dist?: string,
    custom_query?: boolean;
}

const ClippedDrawer: FC = () => {

    const { user } = useAppSelector(state => state.auth)
    const [logedOut, setLogedOut] = useState<boolean>(true)

    const favData = useGetApiQuery('logout', {skip: logedOut})
    const dispatch = useAppDispatch()
    let navigate = useNavigate();

    const Logout = () => {
        deleteCookie('role');
        setLogedOut(!logedOut)
        dispatch(changeUserAndBearerToken({} as Omit<AuthState, "csrfToken">))
        navigate('/', { replace: true });
    }

    const returnSidebarCells = () => {

        switch (user.role) {
            case 'admin':
                return (
                    [
                        { name: 'Модерация', href: 'moderation', dist: 'moderation' },
                        { name: 'Линия 1', href: 'table', dist: 'main_moder' },
                        { name: 'Линия 2', href: 'lines', dist: 'lines' },
                        { name: 'На обработке', href: 'table', dist: 'consideration' },
                        { name: 'Добавить клиента', href: 'profile-add' },
                        { name: 'Активный поиск', href: 'table', dist: 'profiles&vip=1' },
                        { name: 'Пассивный поиск', href: 'table', dist: 'profiles&vip=0' },
                        { name: 'Общая база', href: 'table', dist: 'profiles' },
                        { name: 'Избранные', href: 'table',
                            dist: 'status_not=employee&not_fav_date=true', custom_query: true },
                        { name: 'Текстовая конс.', href: '№' },
                        { name: 'Архив', href: 'table', dist: 'archive' },
                        { name: 'Корзина', href: 'table', dist: 'trash' },
                        { name: 'Клиенты из Excel', href: '#' },
                        { name: 'Импорт', href: 'import' },
                        { name: 'Доступ', href: 'table', dist: 'employee'}
                    ]
                )
            case 'main_moder':
                return (
                    [
                        { name: 'Модерация', href: 'moderation', dist: 'moderation' },
                        { name: 'Линия 2', href: 'lines', dist: 'lines' },
                        { name: 'На обработке', href: 'table', dist: 'cons' },
                        { name: 'Добавить клиента', href: 'profile-add' },
                        { name: 'Активный поиск', href: 'table', dist: 'profiles' },
                        { name: 'Пассивный поиск', href: 'table', dist: 'profiles' },
                        { name: 'Общая база', href: 'table', dist: 'profiles' },
                        { name: 'Избранные', href: 'table', dist: 'get_fav_orders' },
                        { name: 'Текстовая конс.', href: '№' },
                        { name: 'Архив', href: 'table', dist: 'archive' },
                        { name: 'Корзина', href: 'table', dist: 'trash' },
                        { name: 'Клиенты из Excel', href: '#' },
                        { name: 'Импорт', href: 'import' },
                    ]
                )
            case 'consideration':
                return (
                    [
                        { name: 'Модерация', href: 'moderation', dist: 'moderation' },
                        { name: 'Модерация админа', href: 'moderation', dist: 'moderation' },
                        { name: 'Линия 2', href: 'lines', dist: 'lines' },
                        { name: 'Добавить клиента', href: 'profile-add' },
                        { name: 'Активный поиск', href: 'table', dist: 'profiles' },
                        { name: 'Пассивный поиск', href: 'table', dist: 'profiles' },
                        { name: 'Общая база', href: 'table', dist: 'profiles' },
                        { name: 'Избранные', href: 'table', dist: 'get_fav_orders' },
                        { name: 'Архив', href: 'table', dist: 'archive' },
                    ]
                )
            default:
                return (
                    [
                        { name: 'Модерация', href: 'moderation', dist: 'moderation' },
                        { name: 'Добавить клиента', href: 'profile-add' },
                        { name: 'Активный поиск', href: 'table', dist: 'profiles' },
                        { name: 'Пассивный поиск', href: 'table', dist: 'profiles' },
                        { name: 'Общая база', href: 'table', dist: 'profiles' },
                        { name: 'Архив', href: 'table', dist: 'archive' },
                    ]
                )
        }
    }

    const sidebarCells: SidebarCells[] = returnSidebarCells()

    return (
        <Box sx={{ display: 'flex', maxWidth: '100%' }} >
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Goroskop
                    </Typography>
                    <Button
                        sx={{marginLeft: '95%', backgroundColor: 'red'}}
                        variant='contained'
                        onClick={Logout}
                        >
                        Выйти
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: '170px',
                    maxWidth: '25%',
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: '170px', maxWidth: '25%', boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                        {sidebarCells.map((text, index) => {
                            return(
                                    <Link to={text.href} key={index}
                                        style={{ textDecoration: 'none', color: 'black', }}>
                                        <ListItem
                                            onClick={() => text.dist &&
                                                dispatch(changePath({ path: text.custom_query ? text.dist : 'status=' + text.dist, name: text.name}))}
                                            button  sx={{ maxHeight: 'inherit', borderBottom: '1mm solid rgb(170, 50, 220, .6);' }}>

                                            <ListItemText primary={
                                                <>
                                                    <ListItemIcon sx={{ marginLeft: '43%', }}>
                                                        <MailIcon width={'28px'} />
                                                    </ListItemIcon>
                                                    <Typography  component='p' style={{ textAlign: 'center', margin: 0}}>
                                                        {text.name}
                                                    </Typography>

                                                </>}
                                                sx={{ maxHeight: 'inherit'}}
                                            />

                                        </ListItem>
                                    </Link>
                            )
                            })}
                    <Divider />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '100%' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default ClippedDrawer
