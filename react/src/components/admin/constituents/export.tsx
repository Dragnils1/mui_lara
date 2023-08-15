import { Button} from "@mui/material"
import { FC } from "react"
import { useDownloadCSVFileMutation } from "../../../services/goroskop"
import { useAppSelector } from "../../../hooks/hooks"

const Export: FC<{path_with_params: string}> = ({path_with_params}) => {

    const {path, name} = useAppSelector(state => state.adminSlice)
    const [submitDataCSV] = useDownloadCSVFileMutation()

    return (
        <>
            <Button variant="contained" size="large" onClick={() =>
                submitDataCSV({path: path_with_params, file_name: name ?? path})}>
                Экспортировать
            </Button>
        </>
    )
}

export default Export
