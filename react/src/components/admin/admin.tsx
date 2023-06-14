import { FC, useCallback } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { useGetApiQuery } from "../../services/goroskop";
import EnhancedTable from "./constituents/Table";
import { HeadCell } from "../../types/table";
import { Data } from "../../types/data";
import EnhancedTableWithSelect from "./constituents/TableWIthSelectableColumns";
import fileDownload from "js-file-download";

const Admin : FC = () => {

    const {path, name} = useAppSelector(state => state.adminSlice)

    const { data, error, isLoading, currentData, isSuccess } = useGetApiQuery(`find_person?${path}`)
    const headCells: HeadCell[] = [
        {
            id: 'firstname',
            label: 'Имя',
        },
        {
            id: 'email',
            label: 'Email',
        },
        {
            id: 'visible_pass',
            label: 'Пароль',
        },
        {
            id: 'id',
            label: 'Редактировать',
        },
    ];


    let newDate = data
    //  Ну я ниче лучше не придумал



    // if (name === 'Активный поиск') {
    //     newDate = data?.filter(elem => elem.vip == '1')
    // } else if (name === 'Пассивный поиск') {
    //     newDate = data?.filter(elem => elem.vip == '0')
    // }
    // else
    if (name === 'Доступ') {
        newDate = data?.filter(elem => {
            const keyArr: any = ['firstname', 'email', 'visible_pass', 'id']
            return (keyArr.reduce((acc: any, key: keyof Data) => {
            acc[key] = elem[key];
            return acc;
          }, {}))})
    }


    const MemoizedTable = useCallback(() =>
            <>
                {data && (
                    <>
                        {name === 'Доступ'
                         ?
                        <EnhancedTableWithSelect   data={newDate ? newDate : data} nameOfTable={name}
                            headCellsProp={ headCells } path_with_params={path} /> :
                            <EnhancedTable
                                data={newDate ? newDate : data} nameOfTable={name} path_with_params={path}
                        />}


                    </>
                )}
            </>
        , [currentData])



    return(
        <>
            {error && <h1>oops, er: {error}</h1>}
            {isLoading && <h1>Загрузка, подождите пожалуйста</h1>}
            <MemoizedTable />
        </>
    )
}



export default Admin
