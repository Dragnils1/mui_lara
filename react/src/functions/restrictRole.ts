
import { getCookie } from "./Cookie";



export default function restrictRole() {

    const role = getCookie('role')

    switch (role) {
        case "ok_admin":
            return '10'
        case "ok_mainModer":
            return '0'
        case "consideration":
            return '28'
        default:
            return role ? role : "0"
    }

}

