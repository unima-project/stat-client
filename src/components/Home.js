import React, {useState} from 'react';
import Box from "@mui/system/Box";
import {useNavigate} from "react-router-dom";
import {UserProfile} from "../Helpers/userProfile";
import {GetAbout} from "../models";
import {AlertNotification, alertSeverity, alertSeverity as severity} from "./commons/Alert";
import {CommonContext} from "../App";
import Button from "@mui/material/Button";

export const Home = () => {
    const navigate = useNavigate();
    const {isAdmin} = UserProfile();
    const {setLoading} = React.useContext(CommonContext);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [content, setContent] = useState('');

    const contentMemo = React.useMemo(() => {
        return content;
    }, [content])

    React.useEffect(() => {
        if (isAdmin) {
            navigate("/users")
        } else {
            getAbout()
        }
    }, [isAdmin])

    const getAbout = () => {
        setLoading(true);
        GetAbout()
            .then((data) => {
                if (data.data !== null) {
                    setContent(data.data.content);
                }
            })
            .catch((err) => {
                setAlertStatus({
                    severity: severity.ERROR
                    , message: err
                })
            })
            .finally(() => {
                setLoading(false);
            })

    }

    return (
        <Box sx={{p: 2, m: 3, border: '1px dashed lightGrey', marginTop: 10}}>
            <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: contentMemo }}
            ></div>
        </Box>
    )
}