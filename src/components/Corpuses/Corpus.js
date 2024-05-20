import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import {Button, Stack} from "@mui/material";
import Switch from "@mui/material/Switch";
import {userType} from "../../models";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CorpusConfig from "./Config";
import {CommonTable} from "../commons/Table"
import {CommonContext} from "../../App";

export const CorpusList = (props) => {
    const {dataTable, setupColumn, setRows} = CommonTable();
    const {themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    const columnsConfig = {
        ID: {id: 'id', label: 'id', minWidth: 10, visible: true}
        , USER: {id: 'user', label: 'owner', minWidth: 50, visible: true}
        , CORPUS: {id: 'corpus', label: 'corpus', minWidth: 50, visible: true}
        , PUBLIC: {id: 'public', label: 'public', minWidth: 10, visible: true}
        , CREATED_AT: {id: 'created_at', label: 'created.at', minWidth: 10, visible: true}
        , ACTION: {id: 'action', label: '', minWidth: 10, visible: true}
    }

    React.useEffect(() => {
        setRowData();
        setupCurrentColumn();
    }, [props.corpusListMemo, props.userLevel])

    const setupCurrentColumn = () => {
        const config = new CorpusConfig(props.userLevel, columnsConfig);
        setupColumn(config.SetColumns().columns);
    }

    const handleDeleteCorpus = (corpusId) => {
        props.setConfirmationConfig({
            open: true
            , title: "delete.corpus"
            , okFunction: () => props.deleteCurrentCorpus(corpusId)
            , content: 'are.you.sure.want.to.delete.the.corpus.?'
        });
    }

    const handleLoadCorpus = (corpusId, isDownload, userId) => {
        let content = 'are.you.sure.want.to.load.the.corpus.?'
        if (isDownload) {
            content = 'are.you.sure.want.to.download.the.token.list.?'
        }

        props.setConfirmationConfig({
            open: true
            , title: isDownload ? "download.corpus" : "load.corpus"
            , okFunction: () => {
                props.loadCurrentCorpus(corpusId, isDownload, userId);
                if (props.isMember) {
                    props.handleModalClose();
                }
            }
            , content: content
        });
    }

    const publicOnChange = (event, corpus) => {
        corpus.public = event.target.checked ? 1 : 0;
        props.setConfirmationConfig({
            open: true
            , title: "update.corpus"
            , okFunction: () => {
                props.updateCurrentCorpus(corpus);
            }
            , content: "are.you.sure.want.to.update.this.member.?"
        });
    }

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

    const deleteCorpusButton = (corpusId) => {
        return actionButton({
            color: themeColor.danger
            , action: () => handleDeleteCorpus(corpusId)
            , icon: <DeleteForeverIcon/>
            , key: 1,
        });
    }

    const loadCorpusButton = (corpusId, userId) => {
        return actionButton({
            color: themeColor.primary
            , action: () => handleLoadCorpus(corpusId, false, userId)
            , icon: <VisibilityIcon/>
            , key: 2,
        })
    }

    const printCorpusTokenButton = (corpusId, userId) => {
        return actionButton({
            color: themeColor.success
            , action: () => handleLoadCorpus(corpusId, true, userId)
            , icon: <DownloadIcon/>
            , key: 3,
        })
    }

    const setupActionButtonList = (userLevel, corpusId, userId) => {
        switch (userLevel) {
            case userType.USER_ADMIN:
                return [
                    loadCorpusButton(corpusId, userId)
                    , printCorpusTokenButton(corpusId, userId)
                    , deleteCorpusButton(corpusId)
                ];
            case userType.USER_MEMBER:
                return [
                    loadCorpusButton(corpusId, userId)
                    , printCorpusTokenButton(corpusId, userId)
                    , deleteCorpusButton(corpusId)
                ];
            default:
                return [
                    loadCorpusButton(corpusId, userId)
                    , printCorpusTokenButton(corpusId)
                ];
        }
    }

    const setRowData = () => {
        setRows(props.corpusListMemo.map((corpus, index) => {
            const checked = corpus.public === 1
            return {
                id: index + 1
                , user: corpus.user
                , corpus: corpus.corpus
                , public: <Switch
                    checked={checked}
                    onChange={(event) => {
                        publicOnChange(event, corpus);
                    }}
                />
                , created_at: corpus.created_at
                , action: <Stack direction="row" spacing={2}>
                    {
                        setupActionButtonList(props.userLevel, corpus.id, corpus.user_id).map(button => {
                            return button
                        })
                    }
                </Stack>
            }
        }));
    }

    return (<>{dataTable}</>)
}