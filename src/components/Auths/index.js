import * as React from 'react';
import Box from "@mui/system/Box";
import {AuthLogin} from "../../models";
import {AlertNotification} from "./alert";
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {LoginForm} from "./Login";

export const Login = (props) => {
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState({
        email: ""
        , password: ""
    });
    const [alertMessage, setAlertMessage] = React.useState("");
    const [cookie, setCookie] = useCookies(['token', 'name']);


    React.useEffect(() => {
        if (cookie.token) navigate("/");
    }, [cookie.token])

    const handleChange = (event) => {
        setAuth({
            ...auth
            , [event.target.id]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthLogin(auth)
            .then((data) => {
                setCookie('token', data.data.token);
                setCookie('name', data.data.name);
                navigate("/");
            })
            .catch(error => {
                setAlertMessage(error);
            })
    }

    return (
        <Box sx={{
            p: 5
            , border: '1px solid darkGrey'
            , textAlign: 'center'
            , marginTop: 20
            , marginLeft: 45
            , marginRight: 45
        }}>
            {
                cookie.token ?
                    <></> : <>
                        <AlertNotification alertMessage={alertMessage} setAlertMessage={setAlertMessage}/>
                        <LoginForm handleSubmit={handleSubmit} handleChange={handleChange} auth={auth}/>
                    </>
            }
        </Box>
    );
}