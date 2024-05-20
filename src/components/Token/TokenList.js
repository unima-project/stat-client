import React from 'react';
import {CommonTable} from "../commons/Table";
import {Button, Stack} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CorpusConfig from "../Corpuses/Config";
import {CommonContext} from "../../App";

export const TokenList = (props) => {
    const {dataTable, setupColumn, setRows} = CommonTable();
    const {themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    const columns = {
        ID: {id: 'id', label: 'id', minWidth: 10, visible: true}
        , TOKEN: {id: 'token', label: 'token', minWidth: 50, visible: true}
        , CREATED_AT: {id: 'created_at', label: 'created.at', minWidth: 10, visible: true}
        , ACTION: {id: 'action', label: '', minWidth: 10, visible: true}
    }

    React.useEffect(() => {
        setRowData();
        setupColumn(columns);
    }, [props.tokensMemo])

    const actionButton = (prop) => {
        return <Button
            size="small"
            variant="outlined"
            component="label"
            sx={{color: prop.color}}
            onClick={prop.action}
            key={prop.key}
        >{prop.icon}</Button>
    }

    const deleteTokenButton = (tokenId) => {
        return actionButton({
            color: themeColor.danger
            , action: () => handleDeleteToken(tokenId)
            , icon: <DeleteForeverIcon/>
            , key: 1,
        });
    }

    const handleDeleteToken = (tokenId) => {
        props.setConfirmationConfig({
            open: true
            , title: "delete.token"
            , okFunction: () => props.deleteCurrentToken(tokenId)
            , content: "are.you.sure.want.to.delete.the.token.?"
        });
    }

    const setRowData = () => {
        setRows(props.tokensMemo.map((token, index) => {
            return {
                id: index + 1
                , token: token.token
                , created_at: token.created_at
                , action: <Stack direction="row" spacing={2}>
                    {deleteTokenButton(token.id)}
                </Stack>
            }
        }));
    }

    return(<>{dataTable}</>)
}