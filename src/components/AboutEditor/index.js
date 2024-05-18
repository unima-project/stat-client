import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Grid from "@mui/system/Unstable_Grid";
import {AddAbout, GetAbout, UpdateAbout} from "../../models";
import {CommonContext} from "../../App";
import {AlertNotification, alertSeverity as severity, alertSeverity} from "../commons/Alert";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {UserProfile} from "../../Helpers/userProfile";
import SaveIcon from "@mui/icons-material/Save";
import {Button} from "@mui/material";
import {SetupCookies} from "../../Helpers/cookie";
import Box from "@mui/joy/Box";

export const AboutEditor = () => {
    const [content, setContent] = useState('');
    const [about, setAbout] = useState(undefined);
    const {setLoading} = React.useContext(CommonContext);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {isAdmin} = UserProfile();
    const {cookie} = SetupCookies();

    React.useEffect(() => {
        getAbout();
    }, [isAdmin])

    const contentMemo = React.useMemo(() => {
        return content;
    }, [content])

    const addUpdateCallback = React.useCallback((content, token) => {
        // return about !== undefined
        //     ? updateAbout(content, token)
        //     : addAbout(content, token);

        // return addAbout(content, token);

        return updateAbout(content, token);
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
                    , message: `${data.message}`
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
                    , message: `${data.message}`
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
                , message: 'content required !!'
            })

            return
        }

        setConfirmationConfig({
            open: true
            , title: "Add About"
            , okFunction: () => addUpdateCallback(content, token)
            , content: `Are you sure want to add about ?`
        });
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]

    const view = <>
        <Grid container sx={{marginTop: 10, width: '100%'}}>
            <Grid container justifyContent={"center"}  sx={{width: '100%'}}>
                <h2>About</h2>
            </Grid>
            <Grid container justifyContent={"center"}  sx={{width: '100%'}}>
                <ModalConfirmation confirmationConfig={confirmationConfig}/>
                <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
            </Grid>
            <Grid container justifyContent={"left"}  sx={{width: '100%'}}>
                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={() => {handleAddAbout(content, cookie.token)}}
                    startIcon={<SaveIcon/>}
                    sx={{minWidth: 110}}
                >Save</Button>
            </Grid>
        </Grid>
        <Box sx={{marginTop: 2, width: '100%'}}>
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