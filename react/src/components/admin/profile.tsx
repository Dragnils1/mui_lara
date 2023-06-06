import cloneDeep from "lodash.clonedeep";
import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import useWhoIs from "../../hooks/useWhoIs";
import { useSubmitDataMutation } from "../../services/goroskop"
import ScrollDialog from "../quiz/Dialog";
import DraggableEnhancedTable from "./constituents/dragableTable";
import FormAdmin from "./constituents/formAdmin";
import SendStatusButton from "./constituents/sendStatusButton";
import EnhancedTable from "./constituents/Table";


const Profile: FC = () => {

    let { user_id } = useParams()
    

    const [submitData, { data, error, isLoading }] = useSubmitDataMutation()
    const [favSubData, favData ] = useSubmitDataMutation();

    let deepCloneData = (favData.data && typeof favData.data !== 'string') ? cloneDeep(favData.data) : []

    // const account = useWhoIs().Account
    
    


    const newData = (favData.data && typeof favData.data !== 'string' && data && typeof data !== 'string' && deepCloneData.length) ? 
        (favData.data.find(el => el.id === data[0].id)
            ? (deepCloneData.splice(0, 0, deepCloneData.splice(Number(deepCloneData.findIndex(el => el.id === data[0].id)), 1)[0]) && deepCloneData)
            : data.slice().concat(deepCloneData)) : []
    

    let FormDefaultValues = data ? (typeof data[0] != 'string' ? data[0] : false) : false

    useEffect (() => {
        let fd = new FormData()
        fd.append('user_id', user_id ? user_id : '')

        submitData({ name: 'profile.php', data: fd })

    }, [user_id])

    useEffect(() => {
        let fd = new FormData()
        fd.append('fav', typeof FormDefaultValues !== 'boolean' ? FormDefaultValues.fav : '')
    
        favSubData({ name: 'cabinet/get_favorites.php', data: fd })

    }, [FormDefaultValues])


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