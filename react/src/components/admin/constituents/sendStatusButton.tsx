import { Button, MenuItem, Select } from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSubmitDataMutation } from "../../../services/goroskop"
import { useAppSelector } from "../../../hooks/hooks"

const SendStatusButton = () => {

    const { user_id } = useParams()
    const { user} = useAppSelector(state => state.auth)

    const moders = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [moder, setModer] = useState('1')

    const [sendData, { }] = useSubmitDataMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const sendStatus = (id: string, value: string, key?: string) => {

        let fD = new FormData();
        fD.append('id', id)
        fD.append('status', value)
        fD.append('_method', "PUT")
        key && fD.append('key', key)

        sendData({name: `dashboard/${id}`, data: fD})

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }


    if (user_id ) {
        switch (user.role) {
            case 'admin':
                return (
                    <>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'main_moder')}>Отправить главному модератору</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'consideration')}>Отправить на обработку</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, `moder_${moder}`)}>Отправить модератору</Button>
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
            case 'main_moder' :
                return (
                    <>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'admin')}>Отправить админу</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'consideration')}>Отправить на обработку</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, `moder_${moder}`)}>Отправить модератору</Button>
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
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'admin')}>Отправить админу</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'main_moder')}>Отправить главному модератору</Button>
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
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'admin')}>Отправить админу</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'main_moder')}>Отправить главному модератору</Button>
                        <Button variant="contained" onClick={() => sendStatus(user_id, 'consideration')}>Отправить на обработку</Button>
                    </>
                )
        }
    } else {
        return <h1>Как вы сюда попали?)</h1>
    }


}
export default SendStatusButton
