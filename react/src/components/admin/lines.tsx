import { FC } from "react"
import T from "../quiz/OnlyText"
import AdminDataWithTable from "./constituents/AdminDataWithTable"
import Export from "./constituents/export"

const Lines: FC = () => {

    const lines = ['moder_1', 'moder_2', 'moder_3',
             'moder_4', 'moder_5', 'moder_6', 'moder_7',
             'moder_8', 'moder_9']

    return(
        <>
            {lines.map(el => <AdminDataWithTable key={el} name={el} />)}

            <T>Экспортировать таблицу с 1 по 9 подератора:</T>
            <Export path_with_params={`status_in=${lines.join()}`} />

        </>
    )
}

export default Lines
