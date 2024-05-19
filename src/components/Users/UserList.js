import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Button, Stack} from "@mui/material";
import {userTypeConfig, userStatus, userType} from "../../models";
import Switch from '@mui/material/Switch';
import {userAction} from './index';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import {userTypeItems} from "../../models";
import FormControl from "@mui/material/FormControl";
import {CommonTable} from "../commons/Table";
import {CommonContext} from "../../App";

const columns = {
    ID: {id: 'no', label: 'No', minWidth: 5, visible: true}
    , USER_TYPE: {id: 'user_type', label: 'Type', minWidth: 25, visible: true}
    , NAME: {id: 'name', label: 'Name', minWidth: 50, visible: true}
    , EMAIL: {id: 'email', label: 'Email', minWidth: 50, visible: true}
    , NO_KTP: {id: 'noKtp', label: 'No.KTP', minWidth: 20, visible: true}

    , NO_HP: {id: 'noHp', label: 'No.HP', minWidth: 20, visible: true}
    , ADDRESS: {id: 'address', label: 'Address', minWidth: 100, visible: true}
    , REASON: {id: 'reason', label: 'Reason', minWidth: 20, visible: true}
    , STATUS: {id: 'status', label: 'Status', minWidth: 10, visible: true}
    , ACTION: {id: 'action', label: '', minWidth: 20, visible: true}
}

export const UserList = (props) => {
    const {dataTable, setupColumn, setRows} = CommonTable();
    const {themeColor} = React.useContext(CommonContext);

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
        const typeSelect = event.target.value;
        user.user_type = typeSelect;
        props.setConfirmationConfig({
            open: true
            , title: "Update User"
            , okFunction: () => {
                props.updateUser(user);
            }
            , content: `Are you sure want to set user ${user.name} as ${userTypeConfig[typeSelect].label} ?`
        });
    }
    const statusOnChange = (event, user) => {
        const checked = event.target.checked ? 1 : 0;
        user.status = checked;
        props.setConfirmationConfig({
            open: true
            , title: "Update User"
            , okFunction: () => {
                props.updateUser(user);
            }
            , content: `Are you sure want to set ${userStatusConfig[checked].label} user ${user.name} ?`
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
            , title: "Delete User"
            , okFunction: () => {
                props.deleteUser(userId)
            }
            , content: `Are you sure want to delete user ${userName} ?`
        })
    }

    const handleEdit = (user) => {
        props.handleModalOpen({
            title: userAction.EDIT_USER
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