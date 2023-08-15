import { useSnackbar } from "notistack";
import { changeUser, checkAuth } from "../reducers/authSlice";
import { useAuthAccountMutation } from "../services/goroskop";
import { useAppDispatch } from "./hooks";
import { useEffect, useState } from "react";
import { Person } from "../types/person";


const useAuth = () => {

    // const [submitData, { data, isError, isSuccess }] = useAuthAccountMutation()
    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [autorized, setAutorized] = useState(false)

    const dispatch = useAppDispatch()

    const authResponse = async () => {
        const originalPromiseResult =  await dispatch(checkAuth()).unwrap()
        return originalPromiseResult
    }

    useEffect(() => {
        authResponse().then((res) => setAutorized(res))
    }, [])

    // isError && enqueueSnackbar('Вы не авторизованы', {
    //     variant: 'error',
    // })


    // if(isSuccess && data?.user) {
    //     dispatch(changeUser({user: data?.user as Person}))
    // }

    return autorized


}

export default useAuth;
