import React from 'react';
import {
    GetUserList,
    DeleteUser,
    UpdateUser,
    CreateUser,
    ResetUserPassword,
    defaultUserData
} from '../../models';
import {SetupCookies} from '../../Helpers/cookie';
import Box from "@mui/material/Box";
import {AlertNotification, alertSeverity, defaultAlertStatus} from "../commons/Alert";
import {UserList} from "./UserList";
import {useNavigate} from "react-router";
import {ModalUser} from "./ModalUser";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Button} from "@mui/material";
import Grid from '@mui/system/Unstable_Grid';
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {CommonContext} from "../../App";

export const userAction = {
    INPUT_USER: "input.member"
    , EDIT_USER: "update.member"
}

const defaultUserAction = {
    title: userAction.INPUT_USER
    , data: defaultUserData
}

export const User = () => {
    const navigate = useNavigate();
    const {cookie} = SetupCookies();
    const [userList, setUserList] = React.useState([]);
    const [alertStatus, setAlertStatus] = React.useState(defaultAlertStatus);
    const [action, setAction] = React.useState(defaultUserAction);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {setLoading, themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    React.useEffect(() => {
        if (!cookie.token) {
            navigate("/");
        } else {
            getUserList();
        }
    }, [])

    const clearAlertStatus = () => {
        setAlertStatus({
            message: ""
            , severity: alertSeverity.INFO
        });
    }

    const handleModalOpen = (userAction) => {
        setAction(userAction);
        setModalOpen(true);
        clearAlertStatus();
    };

    const handleModalClose = () => {
        setModalOpen(false);
        clearAlertStatus();
    };

    const getUserList = () => {
        setLoading(true);

        GetUserList(cookie.token)
            .then(data => {
                setUserList(data.data);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() =>{
                setLoading(false);
            })
    }

    const deleteUser = (userId) => {
        setLoading(true);

        DeleteUser(userId, cookie.token)
            .then(data => {
                getUserList();
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() =>{
                setLoading(false);
            })
    }

    const updateUser = (userData) => {
        setLoading(true);

        UpdateUser(userData, cookie.token)
            .then(data => {
                getUserList();
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() =>{
                setLoading(false);
            })
    }

    const createUser = (userData) => {
        setLoading(true);

        CreateUser(userData, cookie.token)
            .then(data => {
                getUserList();
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: `${data.message}, (${t('email')}: ${data.data.email}, ${t('password')}: ${data.data.password})`
                })
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() =>{
                setLoading(false);
            })
    }

    const resetUserPassword = (userId) => {
        setLoading(true);

        ResetUserPassword(userId, cookie.token)
            .then(data => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: `${data.message}, (${t('email')}: ${data.data.email}, ${t('new.password')}: ${data.data.new_password})`
                })
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() =>{
                setLoading(false);
            })
    }

    return (<Box sx={{marginTop: 15, color: themeColor.primary}}>
        <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
        <ModalConfirmation confirmationConfig={confirmationConfig}/>
        <Grid container justify="flex-end">
            <h2>{t('member.list')}</h2>
            <Button
                sx={{mb: 2, marginLeft: "auto", color: themeColor.success}}
                variant="outlined"
                component="label"
                onClick={() => {
                    handleModalOpen({
                        title: userAction.INPUT_USER
                        , data: defaultUserData
                    });
                }}
                startIcon={<PersonAddIcon/>}
            >{t('new.member')}</Button>
        </Grid>
        <ModalUser
            modalOpen={modalOpen}
            action={action}
            updateUser={updateUser}
            alertStatus={alertStatus}
            setAlertStatus={setAlertStatus}
            createUser={createUser}
            setConfirmationConfig={setConfirmationConfig}
            handleModalClose={handleModalClose}
            userId={cookie.id}
            resetUserPassword={resetUserPassword}
        />
        <UserList
            userList={userList}
            deleteUser={deleteUser}
            userId={cookie.id}
            updateUser={updateUser}
            handleModalOpen={handleModalOpen}
            setConfirmationConfig={setConfirmationConfig}
        />
    </Box>);
}