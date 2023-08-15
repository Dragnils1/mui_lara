import { FC} from "react";
import { useGetApiQuery } from "../../../services/goroskop";
import EnhancedTable from "./Table";

const AdminDataWithTable: FC<{name: string}> = ({name}) => {

    const { data, error, isLoading} = useGetApiQuery(`find_person?status=${name}`)

    return (
        <>
            {error && <h1>oops, error, log in console <>{console.error(error)}</></h1>}
            {isLoading && <h1>Загрузка, подождите пожалуйста</h1>}
            {data && <EnhancedTable data={data} nameOfTable={name} />}
        </>
    )
}

export default AdminDataWithTable
