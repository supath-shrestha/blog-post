import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./index";

const AuthLayout = ({ authentication = true, children }) => {
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector(state => state.auth.status)

    const navigate = useNavigate()

    useEffect(() => {
        if (authentication && authentication !== authStatus) {
            navigate('/login')
        } else if (!authentication && authentication !== authStatus) {
            navigate('/')
        }
        setLoading(false)
    }, [authStatus])

    return loading ? (
        <Spinner />
    ) : (
        <>{children}</>
    );
}
export default AuthLayout;