import { useEffect } from "react";
import { useInitCsrfMutation } from "../services/goroskop";
import { useAppDispatch } from "./hooks";
import { changeCSRFtoken } from "../reducers/authSlice";


export default function useInitCSRF(): void {


    const [submitData, { data, error, isLoading, isSuccess}] = useInitCsrfMutation()

    const dispatch = useAppDispatch()

    isSuccess && dispatch(changeCSRFtoken({csrfToken: data}))


    useEffect (() => {
        submitData()
    }, [])

}

