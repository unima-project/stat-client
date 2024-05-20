import React, {useState} from 'react';
import {AddTheme, GetTheme, UpdateTheme} from "../../models";
import {SetupCookies} from "../../Helpers/cookie";
import {CommonContext} from "../../App";
import {AlertNotification, alertSeverity as severity, alertSeverity} from "../commons/Alert";
import Grid from "@mui/system/Unstable_Grid";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {UserProfile} from "../../Helpers/userProfile";
import {ColorPalette} from "./ColorPalette";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {defaultDialogAction, ModalForm} from "../commons/ModalForm";

export const defaultThemeColor = {
    'primary': '#153448'
    , 'secondary': '#3C5B6F'
    , 'success': '#948979'
    , 'warning': '#DFD0B8'
    , 'danger': '#D20062'
    , 'info': '#75A47F'
}

export const Themes = () => {
    const [theme, setTheme] = useState(undefined);
    const [color, setColor] = useState(defaultThemeColor);
    const {cookie} = SetupCookies();
    const {setLoading, themeColor, translate} = React.useContext(CommonContext);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {isAdmin} = UserProfile();
    const [dialogAction, setDialogAction] = React.useState(defaultDialogAction);
    const t = translate.t;

    React.useEffect(() => {
        getTheme();
    }, [isAdmin, cookie])

    const colorMemo = React.useMemo(() => {
        return color
    }, [color])

    const getTheme = () => {
        setLoading(true);
        GetTheme()
            .then((data) => {
                if (data.data !== null) {
                    setTheme(data.data);
                    setColor(JSON.parse(data.data.color));
                }
            })
            .catch((error) => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const addTheme = (color, token) => {
        setLoading(true);
        AddTheme(color, token)
            .then((data) => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
                getTheme();
            })
            .catch((error) => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const updateTheme = (color, token) => {
        setLoading(true);
        UpdateTheme(color, token)
            .then((data) => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
                getTheme();
            })
            .catch((error) => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const setupThemeColor = (title, newColor) => {
        const newThemeColor = {...color, [title]: newColor};
        setColor(newThemeColor);
    }

    const colorTheme = (props) => {
        return (
            <Stack container direction="column" alignItems="center" spacing={2}>
                <Button
                    variant="contained"
                    sx={{backgroundColor: props.color, width: 25, height: 25, padding: 5}}
                    onClick={() => openDialogAction({color: props.color, title: props.title})}
                >
                    {props.color}
                </Button>
                <Box>{props.title}</Box>
            </Stack>
        )
    }

    const closeDialogAction = () => {
        setDialogAction(defaultDialogAction);
    }

    const openDialogAction = (props) => {
        setDialogAction({
            onClose: closeDialogAction
            , open: true
            , title: t("pick.theme.color")
            , content: <ColorPalette
                color={props.color}
                setupThemeColor={setupThemeColor}
                title={props.title.toLowerCase()}
            />
        })
    }

    const actionButton = <Stack container direction="row" alignItems="center" spacing={1}>
        <Button
            variant="contained"
            sx={{backgroundColor: themeColor.primary, minWidth: 100}}
            onClick={() => handleAddThemeCallback(JSON.stringify(color), cookie.token)}
        >{t('save')}</Button>
        <Button
            variant="contained"
            sx={{backgroundColor: themeColor.danger, minWidth: 100}}
            onClick={() => handleResetTheme()}
        >{t('reset')}</Button>
    </Stack>

    const colorSchemeStack = <Stack container direction="row" alignItems="center" spacing={2}>
        <Box>{colorTheme({title: "Primary", color: colorMemo.primary})}</Box>
        <Box>{colorTheme({title: "Secondary", color: colorMemo.secondary})}</Box>
        <Box>{colorTheme({title: "Success", color: colorMemo.success})}</Box>
        <Box>{colorTheme({title: "Warning", color: colorMemo.warning})}</Box>
        <Box>{colorTheme({title: "Danger", color: colorMemo.danger})}</Box>
        <Box>{colorTheme({title: "Info", color: colorMemo.info})}</Box>
    </Stack>

    const extendComponents = <>
        <ModalConfirmation confirmationConfig={confirmationConfig}/>
        <ModalForm dialogAction={dialogAction} />
        <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
    </>

    const addUpdateCallback = React.useCallback((color, token) => {
        return theme !== undefined
            ? updateTheme(color, token)
            : addTheme(color, token);
    }, [color])

    const handleAddTheme = (color, token) => {
        if (color === null || color === undefined || color === '') {
            setAlertStatus({
                severity: severity.ERROR
                , message: 'color.required !!'
            })

            return
        }

        setConfirmationConfig({
            open: true
            , title: "add./.update.theme.color"
            , okFunction: () => addUpdateCallback(color, token)
            , content: "are.you.sure.want.to.add./.update.theme.?"
        });
    }

    const handleResetTheme = () => {
        setConfirmationConfig({
            open: true
            , title: "reset.theme.color"
            , okFunction: () => getTheme()
            , content: "are.you.sure.want.to.reset.theme.color.?"
        });
    }

    const handleAddThemeCallback = React.useCallback((color, token) => {
        return handleAddTheme(color, token);
    }, [color])

    const view = <Grid container sx={{marginTop: 10, color: themeColor.primary}}>
        <Grid container justifyContent={"center"} sx={{width: '100%'}}>
            <h2>{t("color.theme")}</h2>
        </Grid>
        <Grid container justifyContent={"center"} sx={{width: '100%', marginTop: 3}}>
            {extendComponents}
        </Grid>
        <Grid container justifyContent={"center"} sx={{width: '100%', marginTop: 3}}>
            {colorSchemeStack}
        </Grid>
        <Grid container justifyContent={"center"} sx={{width: '100%', marginTop: 3}}>
            {actionButton}
        </Grid>
    </Grid>

    return (isAdmin ? view : <></>)
}