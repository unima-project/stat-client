import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Grid from "@mui/system/Unstable_Grid";
import {AddAbout, GetAbout, UpdateAbout} from "../../models";
import {CommonContext} from "../../App";
import {AlertNotification, alertSeverity as severity, alertSeverity} from "../commons/Alert";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {UserProfile} from "../../Helpers/userProfile";
import {SetupCookies} from "../../Helpers/cookie";
import Box from "@mui/joy/Box";
import QuillToolbar , { modules, formats } from "./toolbar";

export const AboutEditor = () => {
    const [content, setContent] = useState('');
    const [about, setAbout] = useState(undefined);
    const {setLoading, themeColor, translate} = React.useContext(CommonContext);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {isAdmin} = UserProfile();
    const {cookie} = SetupCookies();
    const t = translate.t;

    React.useEffect(() => {
        getAbout();
    }, [isAdmin])

    const contentMemo = React.useMemo(() => {
        return content;
    }, [content])

    const addUpdateCallback = React.useCallback((content, token) => {
        return about !== undefined
            ? updateAbout(content, token)
            : addAbout(content, token);
    }, [content])

    const getAbout = () => {
        setLoading(true);
        GetAbout()
            .then((data) => {
                if (data.data !== null) {
                    setAbout(data.data);
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

    const addAbout = (content, token) => {
        setLoading(true);
        AddAbout(content, token)
            .then((data) => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
                getAbout();
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

    const updateAbout = (content, token) => {
        setLoading(true);
        UpdateAbout(content, token)
            .then((data) => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
                getAbout();
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

    const handleAddAbout = (content, token) => {
        if (content === null || content === undefined || content === '') {
            setAlertStatus({
                severity: severity.ERROR
                , message: "content.required !!"
            })

            return
        }

        setConfirmationConfig({
            open: true
            , title: "add./.update.about.content"
            , okFunction: () => addUpdateCallback(content, token)
            , content: "are.you.sure.want.to.add./.update.about.?"
        });
    }

    const handleAddAboutCallback = React.useCallback((content, token) => {
        return handleAddAbout(content, token);
    }, [content])

    const view = <>
        <Grid container sx={{marginTop: 10, width: '100%', color: themeColor.primary}}>
            <Grid container justifyContent={"center"}  sx={{width: '100%'}}>
                <h2>{t("about")}</h2>
            </Grid>
            <Grid container justifyContent={"center"}  sx={{width: '100%'}}>
                <ModalConfirmation confirmationConfig={confirmationConfig}/>
                <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            </Grid>
        </Grid>
        <Box sx={{marginTop: 2, width: '100%'}}>
            <QuillToolbar
                handleAddAboutCallback={handleAddAboutCallback}
                cookie={cookie}
                contentMemo={contentMemo}
            />
            <ReactQuill
                theme="snow"
                value={contentMemo}
                onChange={setContent}
                modules={modules}
                formats={formats}
            />
        </Box>
    </>

    return (<>{isAdmin ? view : <></>}</>)
}