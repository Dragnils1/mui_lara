import { Button } from "@mui/material"
import { useSnackbar } from "notistack"
import { FC } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { useGetApiQuery, useSubmitDataMutation } from "../../services/goroskop"
import T from "../quiz/OnlyText"
import EnhancedTable from "./constituents/Table"

const Lines: FC = () => {

    // const { path, date } = useAppSelector(state => state.adminSlice)
    const dispastch = useAppDispatch()

    const { data, error, isLoading } = useGetApiQuery('lines.php')    
    const [submitData, { }] = useSubmitDataMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
            {error && <h1>oops, er: {error}</h1>}
            {/* <TextField
                id="date-picker"
                label='Выберите дату'
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={date}
                onChange={(e) => dispastch(restrictDate(e.target.value))}
            /> */}
            {isLoading && <h1>Загрузка, подождите пожалуйста</h1>}
            {data && (
                <>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '1')} nameOfTable='Модератор 1'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '2')} nameOfTable='Модератор 2'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '3')} nameOfTable='Модератор 3'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '4')} nameOfTable='Модератор 4'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '5')} nameOfTable='Модератор 5'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '6')} nameOfTable='Модератор 6'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '7')} nameOfTable='Модератор 7'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '8')} nameOfTable='Модератор 8'/>
                    <EnhancedTable data={data?.filter(obj => obj['status'] === '9')} nameOfTable='Модератор 9'/>
                </>
            )}

            
            <T>Экспортировать таблицу с 1 по 9 подератора:</T>
            <Button variant="contained" size="large" onClick={() =>
                sendExport(undefined, 'Линия 2')}>
                Экспортировать
            </Button>
        </>
    )
}

export default Lines