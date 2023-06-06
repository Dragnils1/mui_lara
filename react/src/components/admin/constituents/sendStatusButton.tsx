import { Button, MenuItem, Select } from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getCookie } from "../../../functions/Cookie"
import { useSubmitStatusMutation } from "../../../services/goroskop"

const SendStatusButton = () => {

    const { user_id } = useParams()

    const moders = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [moder, setModer] = useState('1')
    
    const [sendStat, { }] = useSubmitStatusMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const sendStatus = (id: string, value: string, key?: string) => {

        let fD = new FormData();
        fD.append('id', id)
        fD.append('status', value)
        key && fD.append('key', key)

        sendStat(fD)

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }
    

    if (user_id ) {
        switch (getCookie('role')) {
            case 'ok_admin':
                return (
                    <>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '0')}>Отправить главному модератору</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '28')}>Отправить на обработку</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, moder)}>Отправить модератору</Button>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={moder}
                            onChange={e => setModer(e.target.value)}
                        >
                            {moders.map((elem, index) => {
                                return (
                                    <MenuItem value={elem} key={index}>{elem}</MenuItem>
                                )
                            })}
                        </Select>
                    </>
                )
            case 'ok_mainModer' :
                return (
                    <>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '10')}>Отправить админу</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '28')}>Отправить на обработку</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, moder)}>Отправить модератору</Button>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={moder}
                            onChange={e => setModer(e.target.value)}
                        >
                            {moders.map((elem, index) => {
                                return (
                                    <MenuItem value={elem} key={index}>{elem}</MenuItem>
                                )
                            })}
                        </Select>
                    </>
                )
            case 'consideration':
                return (
                    <>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '0')}>Отправить админу</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '0')}>Отправить главному модератору</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, moder)}>Отправить модератору</Button>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={moder}
                            onChange={e => setModer(e.target.value)}
                        >
                            {moders.map((elem, index) => {
                                return (
                                    <MenuItem value={elem} key={index}>{elem}</MenuItem>
                                )
                            })}
                        </Select>
                    </>
                )
            default:
                return (
                    <>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '0')}>Отправить админу</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '0')}>Отправить главному модератору</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, '28')}>Отправить на обработку</Button>
                    </>
                )
        }
    } else {
        return <h1>Как вы сюда попали?)</h1>
    }

    
}
export default SendStatusButton