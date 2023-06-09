import { Button } from "@mui/material"
import { useSnackbar } from "notistack"
import { FC } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { useGetApiQuery, useSubmitDataMutation } from "../../services/goroskop"
import T from "../quiz/OnlyText"
import EnhancedTable from "./constituents/Table"
import AdminDataWithTable from "./constituents/AdminDataWithTable"

const Lines: FC = () => {

    // const { path, date } = useAppSelector(state => state.adminSlice)
    const dispastch = useAppDispatch()

    const [submitData, { }] = useSubmitDataMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const lines = ['moder_1', 'moder_2', 'moder_3',
             'moder_4', 'moder_5', 'moder_6', 'moder_7',
             'moder_8', 'moder_9']

    const sendExport = (id?: string, name?: any) => {

        let fD = new FormData();



        id && fD.append('val', id)

        switch (typeof name) {
            case 'object':
                fD.append('obj', name)
                break;
            case 'string':
                fD.append('export', name)
                break;
        }
        submitData({ name: 'export.php', data: fD })

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }

    // let newDate = date ?
    //     data?.filter(obj => obj['next_contact_date'] && +new Date(obj['next_contact_date']) <= +new Date(date))
    //     : false

    return(
        <>
            {lines.map(el => <AdminDataWithTable key={el} name={el} />)}

            <T>Экспортировать таблицу с 1 по 9 подератора:</T>
            <Button variant="contained" size="large" onClick={() =>
                sendExport(undefined, 'Линия 2')}>
                Экспортировать
            </Button>
        </>
    )
}

export default Lines
