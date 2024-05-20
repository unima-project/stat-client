import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Button, Stack} from "@mui/material";
import {userStatus, userTypeItems} from "../../models";
import Switch from '@mui/material/Switch';
import {userAction} from './index';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import {CommonTable} from "../commons/Table";
import {CommonContext} from "../../App";

export const UserList = (props) => {
    const {dataTable, setupColumn, setRows} = CommonTable();
    const {themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    const columns = {
        ID: {id: 'no', label: 'id', minWidth: 5, visible: true}
        , USER_TYPE: {id: 'user_type', label: 'type', minWidth: 25, visible: true}
        , NAME: {id: 'name', label: 'name', minWidth: 50, visible: true}
        , EMAIL: {id: 'email', label: 'email', minWidth: 50, visible: true}
        , NO_KTP: {id: 'noKtp', label: 'no.ktp', minWidth: 20, visible: true}

        , NO_HP: {id: 'noHp', label: 'no.hp', minWidth: 20, visible: true}
        , ADDRESS: {id: 'address', label: 'address', minWidth: 100, visible: true}
        , REASON: {id: 'reason', label: 'reason', minWidth: 20, visible: true}
        , STATUS: {id: 'status', label: 'status', minWidth: 10, visible: true}
        , ACTION: {id: 'action', label: '', minWidth: 20, visible: true}
    }

    React.useEffect(() => {
        setRowData();
        setupColumn(columns);
    }, [props.corpusListMemo, props.userLevel])


    const userStatusConfig = {
        0: {label: userStatus.USER_INACTIVE.label}
        , 1: {label: userStatus.USER_ACTIVE.label}
    }

    React.useEffect(() => {
        if (props.userList) setRowData();
    }, [props.userList])

    const typeOnChange = (event, user) => {
        user.user_type = event.target.value;
        props.setConfirmationConfig({
            open: true
            , title: "update.member"
            , okFunction: () => {
                props.updateUser(user);
            }
            , content: "are.you.sure.want.to.update.this.member.?"
        });
    }
    const statusOnChange = (event, user) => {
        user.status = event.target.checked ? 1 : 0;
        props.setConfirmationConfig({
            open: true
            , title: "update.member"
            , okFunction: () => {
                props.updateUser(user);
            }
            , content: "are.you.sure.want.to.update.this.member.?"
        });
    }

    const userTypeControl = (user) => {
        return (
            <FormControl
                sx={{minWidth: 130}}
                size="small"
                disabled={props.userId === user.id}
            >
                <Select
                    value={user.user_type}
                    onChange={(event) => {
                        typeOnChange(event, user)
                    }}
                >
                    {
                        userTypeItems().map((item, index) => {
                            return (
                                <MenuItem value={item.value} key={index}>
                                    <Stack direction="row" spacing={1} alignItems={"center"}>
                                        <Typography sx={{color: themeColor[item.color]}}>{item.icon(16)}</Typography>
                                        <Typography fontSize="10pt" sx={{color: themeColor[item.color]}}>{item.label}</Typography>
                                    </Stack>
                                </MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        )
    }

    const setRowDataOrder = () => {
        const currentUser = props.userList.filter((user) => {
            return user.id === props.userId
        })

        const otherUser = props.userList.filter((user) => {
            return user.id !== props.userId
        })

        return currentUser.concat(otherUser)
    }

    const actionButton = (prop) => {
        return <Button
            disabled={prop.disabled}
            size="small"
            variant="outlined"
            component="label"
            sx={{color: prop.color}}
            onClick={prop.action}
            key={prop.key}
        >{prop.icon}</Button>
    }

    const deleteButton = (userId, userName) => {
        return actionButton({
            color: themeColor.danger
            , action: () => handleDelete(userId, userName)
            , icon: <DeleteForeverIcon/>
            , key: 1
            , disabled: props.userId === userId
        });
    }

    const editButton = (user) => {
        return actionButton({
            color: themeColor.primary
            , action: () => handleEdit(user)
            , icon: <EditNoteIcon/>
            , key: 1
            , disabled: false
        });
    }

    const handleDelete = (userId, userName) => {
        props.setConfirmationConfig({
            open: true
            , title: "delete.member"
            , okFunction: () => {
                props.deleteUser(userId)
            }
            , content: "are.you.sure.want.to.delete.this.user.?"
        })
    }

    const handleEdit = (user) => {
        props.handleModalOpen({
            title: t(userAction.EDIT_USER)
            , data: user
        });
    }

    const setupActionButtonList = (user) => {
        return [
            deleteButton(user.id, user.name)
            , editButton(user)
        ];
    }

    const setRowData = () => {
        setRows(setRowDataOrder().map((user, index) => {
            const userName = user.name.split(" ")[0]

            return {
                no: index + 1
                , user_type: userTypeControl(user)
                , name: userName
                , email: `${user.email.split("@")[0]}@ ...`
                , noKtp: `${user.no_ktp.substring(0, 5)} ...`
                , noHp: `${user.no_hp.substring(0, 5)} ...`
                , address: `${user.address.substring(0, 10)} ...`
                , reason: `${user.reason.substring(0, 10)} ...`
                , status: <Switch
                    disabled={props.userId === user.id}
                    checked={user.status}
                    onChange={(event) => {
                        statusOnChange(event, user);
                    }}
                />
                , action: <Stack direction="row" spacing={2}>
                    {
                        setupActionButtonList(user).map(button => {
                            return button
                        })
                    }
                </Stack>
            }
        }));
    }

    return(<>{dataTable}</>)
}