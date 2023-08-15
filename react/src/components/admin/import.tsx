import { Button, Checkbox, FormControlLabel, FormGroup, Input, TextField } from "@mui/material"
import { pink } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useSnackbar } from "notistack"
import { FC, useState } from "react"
import { Link } from "react-router-dom"
import { useSubmitDataMutation } from "../../services/goroskop"
import T from "../quiz/OnlyText"

const Import: FC = () => {

    const [submitData, { data }] = useSubmitDataMutation()
    const [statusInput, setStatusInput] = useState<string>()
    const [trankate, setTrankate] = useState<boolean>(false)
    const [status, setStatus] = useState<boolean>(false)
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


    const sendImport = (e: React.ChangeEvent<HTMLInputElement>) => {

        let fD = new FormData();

        const file = e.target.files ? e.target.files[0] : 'null'
        
        fD.append(e.target.name, file)
        status && statusInput && fD.append('setStatus', statusInput)
        trankate && fD.append('clear', `${trankate}`)
        submitData({ name: 'import.php', data: fD })

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }
    
    

    
    return (
        <>
            <Box>
                <T>Экспорт:</T>
                <Button variant="contained" size="large" onClick={() =>
                    sendExport(undefined, 'ЭКСПОРТНУЛИ!')}>
                    Экспортировать
                </Button>
                <T><Link to="/api/people.csv" target="_blank">Скачать файл</Link></T>
                
            </Box>
            <Box>
                <T>Импорт:</T>
                <T>Если нужно, укажите статус пользователей (применится ко всем в таблице):</T>
                <TextField id="standard-basic" label="Статус пользователей" variant="standard" 
                    onChange={(e) => setStatusInput(e.target.value) } value={statusInput} />
                <FormGroup>
                    <FormControlLabel control={<Checkbox 
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }}/>}
                        value={trankate}
                        onChange={() => setTrankate(!trankate)}
                        label={statusInput?.trim() ? `Отчистить таблицу со статусом ${statusInput}` 
                            : "Очистить всю таблицу перед импортом" }
                    />
                    <FormControlLabel control={<Checkbox
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }} />}
                        value={status}
                        onChange={() => setStatus(!status)}
                        label={statusInput ? `Применить статус ${statusInput} ко всем пользователям` 
                            : 'Введите статус пользователей'}
                    />
                </FormGroup>
                
                <label htmlFor="contained-button-file2">
                    <Input name="file" onChange={sendImport} id="contained-button-file2" type="file" />
                    <Button variant="contained" component="span">
                        Импортировать
                    </Button>
                </label>
            
            </Box>
        </>    
    )
}

export default Import