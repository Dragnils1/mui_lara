import cloneDeep from "lodash.clonedeep";
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useWhoIs from "../../hooks/useWhoIs";
import { useGetApiQuery, useSubmitDataMutation } from "../../services/goroskop"
import ScrollDialog from "../quiz/Dialog";
import DraggableEnhancedTable from "./constituents/dragableTable";
import FormAdmin from "./constituents/formAdmin";
import SendStatusButton from "./constituents/sendStatusButton";
import EnhancedTable from "./constituents/Table";
import { QuizType } from "../../types/quiz";


const Profile: FC = () => {

    let { user_id } = useParams()

    const [fav, setFav] = useState<any>('')


    // const [submitData, { data, error, isLoading }] = useSubmitDataMutation()
    const { data, error, isLoading, isSuccess, currentData } = useGetApiQuery(`profile/${user_id}`)
    const favData = useGetApiQuery(`find_person?id_in=${fav}`, {skip: !fav.length})

    let deepCloneData = (favData.data && typeof favData.data !== 'string') ? cloneDeep(favData.data) : []


    const newData = (favData.data && typeof favData.data !== 'string' && data && typeof data !== 'string' && deepCloneData.length) ?
        (favData.data.find(el => el.id === data[0].id)
            ? (deepCloneData.splice(0, 0, deepCloneData.splice(Number(deepCloneData.findIndex(el => el.id === data[0].id)), 1)[0]) && deepCloneData)
            : data.slice().concat(deepCloneData)) : []


    let FormDefaultValues = data ? (typeof data[0] != 'string' ? data[0] as QuizType : false) : false


    useEffect(() => {

        setFav(typeof FormDefaultValues !== 'boolean' ? FormDefaultValues.fav : '')

    }, [isSuccess])


    return (
        <>
            {error && <h1>Oops, error </h1>}
            {isLoading && <h1>Подождите, я слишком медленный, что бы быстро загрузиться😀 </h1>}
            {FormDefaultValues && (
                <>
                    <SendStatusButton />
                    <FormAdmin defaultValues={FormDefaultValues} />
                    {newData.length > 1 ? (
                        <ScrollDialog fullScreenDialog>
                            <DraggableEnhancedTable data={newData} nameOfTable={'Избранные'} profile={FormDefaultValues} />
                        </ScrollDialog>
                    ) : <h2>У этого пользователя нет избранных</h2> }

                </>
            )}

        </>
    )
}

export default Profile
