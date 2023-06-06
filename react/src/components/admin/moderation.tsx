import { FC, useEffect} from "react";
import { getCookie } from "../../functions/Cookie";
import { useAppSelector } from "../../hooks/hooks";
import { useSubmitDataMutation } from "../../services/goroskop";
import EnhancedTable from "./constituents/Table";

const Moderation: FC = () => {

    const {  name, date } = useAppSelector(state => state.adminSlice)
    
    const [submitData, {data, error, isLoading, }] = useSubmitDataMutation()


    let newDate = date && data ? typeof data === 'string' ? JSON.parse(data) : true : false

    
    
    //  Ну я ниче лучше не придумал

    useEffect(()=> {
        let role = getCookie('role')
        
        let fd = new FormData()
        fd.append('role', name === 'Модерация админа' ? 'ok_admin' : ( role ?? ''))

        submitData({ name: 'moderation.php', data: fd });

    }, [])

    return (
        <>
            {error && <h1>oops, error, log in console {console.error(error)}</h1>}
            {isLoading && <h1>Загрузка, подождите пожалуйста</h1>}
            {data && <EnhancedTable data={newDate ? newDate : data} nameOfTable={name} />}
        </>
    )
}

export default Moderation