import { useEffect, useState } from "react";
import { getCookie } from "../functions/Cookie";
import { useGetApiQuery } from "../services/goroskop";
import { Data } from "../types/data";
import { useAppSelector } from "./hooks";

function switchRole(role: any): 'admin' | 'user' | 'unlogined' {
    switch (role) {
        case "ok_admin":
        case "ok_mainModer":
        case "ok_Moder":
        case "consideration":
            return 'admin'
        case "ok_user":
            return 'user'
        case null:
            return 'unlogined'
        default:
            return 'unlogined'
    }
}

export default function useWhoIs(): { Account: Data, whoIs: 'admin' | 'user' | 'unlogined' } {


    const { data, isSuccess } = useGetApiQuery('auth.php')
    const { easyRole, Account } = useAppSelector(state => state.main)

    const role = getCookie('role')

    const [whoIs, setwhoIs] = useState({ Account: {} as Data, whoIs: switchRole(role) })

    if (isSuccess && data && data[0].role && (whoIs.whoIs !== switchRole(data[0].role) || whoIs.Account !== data[0])) {

        setwhoIs({ Account: data[0], whoIs: switchRole(data[0].role) })

    }

    Account && whoIs.whoIs !== easyRole && setwhoIs({ Account: Account, whoIs: easyRole })

    return whoIs

}

