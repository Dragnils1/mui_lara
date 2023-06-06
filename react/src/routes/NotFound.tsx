import { FC } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NotFound: FC = () => {

    let location = useLocation();

    return (
        <>
            <h1>Page not found</h1>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
            <hr />
            <h1>Если вы заходите в систему первый раз пожалуйста обновите страницу</h1>
            <hr />
            <Link to={{ pathname: "/"}} />
        </>
    )
}

export default NotFound