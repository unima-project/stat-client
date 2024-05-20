import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {userStatus, userTypeItems} from "../../models";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {Button, Stack} from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import {userAction} from "./index";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import DialogActions from "@mui/material/DialogActions";
import {CommonContext} from "../../App";

export const ModalUserContent = (props) => {
    const {themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    const userStatusConfig = {
        0: {
            label: t(userStatus.USER_INACTIVE.label)
            , color: "danger"
        }
        , 1: {
            label: t(userStatus.USER_ACTIVE.label)
            , color: "primary"
        }
    }

    const handleChange = (data) => {
        props.setUserData({...props.userData, ...data});
    }

    const formTextField = (prop) => {
        return (
            <FormControl fullWidth>
                <TextField
                    type={prop.type}
                    label={prop.label}
                    variant="outlined"
                    value={prop.value}
                    onChange={(event) => {
                        handleChange(prop.data(event));
                    }}
                    required
                    multiline={prop.multiline}
                />
            </FormControl>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setConfirmationConfig({
            open: true
            , title: props.action.title
            , okFunction: () => {
                props.action.title === userAction.INPUT_USER
                    ? props.createUser(props.userData)
                    : props.updateUser(props.userData)
            }
            , content: "are.you.sure.want.to.update./.add.member.?"
        });
    }

    const handleResetPassword = (event) => {
        props.setConfirmationConfig({
            open: true
            , title: props.action.title
            , okFunction: () => props.resetUserPassword(props.userData.id)
            , content: "are.you.sure.want.to.reset.${props.userData.name}.password.?"
        });
    }

    const formSelectField = (prop) => {
        return (
            <FormControl fullWidth required disabled={props.userData.id === props.userId}>
                <InputLabel>{prop.label}</InputLabel>
                <Select
                    size="small"
                    value={prop.value}
                    label={prop.label}
                    onChange={(event) => {
                        handleChange(prop.data(event));
                    }}
                >
                    {
                        prop.items().map((item, index) => {
                            return (
                                <MenuItem value={item.value} key={index}>
                                    <Stack direction="row" spacing={1} alignItems={"center"}>
                                        <Typography sx={{color:themeColor[item.color]}}>{item.icon(22)}</Typography>
                                        <Typography sx={{color:themeColor[item.color]}}>{item.label}</Typography>
                                    </Stack>
                                </MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        )
    }
    const formCheckedField = (prop) => {
        return (
            <FormControl fullWidth disabled={props.userData.id === props.userId}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Switch
                        checked={prop.value}
                        onChange={(event) => {
                            handleChange(prop.data(event));
                        }}
                        required
                    />
                    <Typography sx={{color:themeColor[userStatusConfig[prop.value ? 1 : 0].color]}}>{
                        userStatusConfig[prop.value ? 1 : 0].label
                    }</Typography>
                </Stack>
            </FormControl>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                props.userData ?
                    <Box sx={{flexGrow: 1, marginTop: 3}}>
                        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 1, md: 1}}>
                            <Grid xs={4}>
                                {formSelectField({
                                    label: t("type")
                                    , value: parseInt(props.userData.user_type)
                                    , data: (event) => {
                                        return {user_type: event.target.value}
                                    }
                                    , items: userTypeItems
                                })}
                            </Grid>
                            <Grid xs={8}>
                                {
                                    props.action.title === t(userAction.EDIT_USER)
                                        ? <Button
                                            size="small"
                                            sx={{p: 1, backgroundColor: themeColor.warning}}
                                            variant="contained"
                                            color="info"
                                            onClick={handleResetPassword}
                                            startIcon={<KeyIcon/>}
                                        >{t("reset.password")}</Button>
                                        : <></>
                                }
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: t("name")
                                    , value: props.userData.name
                                    , data: (event) => {
                                        return {name: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: t("email")
                                    , type: "email"
                                    , value: props.userData.email
                                    , data: (event) => {
                                        return {email: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={4}>
                                {formTextField({
                                    label: t("no.ktp")
                                    , value: props.userData.no_ktp
                                    , data: (event) => {
                                        return {no_ktp: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={4}>
                                {formTextField({
                                    label: t("no.hp")
                                    , value: props.userData.no_hp
                                    , data: (event) => {
                                        return {no_hp: event.target.value}
                                    }
                                    , multiline: false
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: t("address")
                                    , value: props.userData.address
                                    , data: (event) => {
                                        return {address: event.target.value}
                                    }
                                    , multiline: true
                                })}
                            </Grid>
                            <Grid xs={6}>
                                {formTextField({
                                    label: t("reason")
                                    , value: props.userData.reason
                                    , data: (event) => {
                                        return {reason: event.target.value}
                                    }
                                    , multiline: true
                                })}
                            </Grid>
                            <Grid xs={12}>
                                {formCheckedField({
                                    label: t("status")
                                    , value: props.userData.status
                                    , data: (event) => {
                                        return {status: event.target.checked}
                                    }
                                })}
                            </Grid>
                        </Grid>
                        <DialogActions sx={{p: 2}}>
                            <Button
                                sx={{backgroundColor: themeColor.danger}}
                                variant="contained"
                                onClick={props.handleModalClose}
                                startIcon={<RestartAltIcon/>}
                                autoFocus
                            >{t('cancel')}</Button>
                            <Button
                                sx={{backgroundColor: themeColor.primary}}
                                variant="contained"
                                startIcon={<SaveIcon/>}
                                type="submit"
                                autoFocus
                            >{t('save')}</Button>
                        </DialogActions>
                    </Box>
                    : <></>
            }
        </form>
    )
}